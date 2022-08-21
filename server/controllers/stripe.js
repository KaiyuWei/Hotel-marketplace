import User from "../models/user";
import Hotel from "../models/hotel";
import Order from "../models/order";
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
    const user = await User.findById(req.auth._id).exec();  // problem: Ryan uses req.user, but I have to use req.auth
    console.log('USER ==>', user);
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
            type: "express",
            capabilities: {  // capbilities enabled
                card_payments: {requested: true},
                transfers: {requested: true},
            },
        });
        console.log("ACCOUNT ===> ", account);
        user.stripe_account_id = account.id;
        user.save();
    }

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL, //The URL the user will be redirected to if the account link is expired, has been previously-visited, or is otherwise invalid.
        return_url: process.env.STRIPE_REDIRECT_URL,  // The return_url is where Stripe will redirect your user when they've finished the onboarding flow.
        type: "account_onboarding",
    });
    // prefill any info such as email
    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });
    // console.log('ACCOUNT LINK ', accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log('LOGIN LINK: ', link);
    res.send(link);
};

const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                },
            },
        },
    });
    return account;
};

export const getAccountStatus = async (req, res) => {
    // console.log('GET ACCOUNT STATUS');
    const user = await User.findById(req.auth._id).exec(); 
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log('USER ACCOUNT RETRIEVE => ', account);
    const updatedAccount = await updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(user._id, 
    {
        stripe_seller: account,  // save the updated information in the mongodb database.
    }, {new: true},
    ).select("-password").exec();  // send all information except the password to the frontend

// console.log(updatedUser); 
res.json(updatedUser);  // send to the frontend
};

export const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.auth._id).exec();
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount : user.stripe_account_id,
        });
        // console.log("BALANCE===> ", balance);
        res.json(balance);
    } catch (err) {
        console.log(err);
    }
};

export const payoutSetting = async (req, res) => {
    try{
        const user = await User.findById(req.auth._id).exec();
        const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id, 
            {
                redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL, 
            }
        );
        // console.log('LOGIN LINK FOR PAYOUT SETTING', loginLink);
        res.json(loginLink);
    } catch(err) {
        console.log('STRIPE PAYOUT SETTING ERROR ',err);
    }
}

export const stripeSessionId = async (req, res) => {
    // console.log('you hit stripe session id', req.body.hotelId);
    // get hotel id from req.body
    const {hotelId} = req.body;
    // find the hotel in db
    const item = await Hotel.findById(hotelId)
        .populate('postedBy')
        .exec();
    // charge for 20% as the application fee
    const fee = (item.price * 20) / 100;
    // create a session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], 
        mode: "payment",
        // purchasing item datails that will be shown to user checkout
        line_items: [
            {
                price_data: {    
                    currency: "usd", 
                    product_data: {
                        name: item.title,
                    },                 
                    unit_amount: item.price * 100,   // must be in cents, so *100                         
                },
                quantity: 1,
            },
        ],
        payment_intent_data: {
            application_fee_amount: fee * 100,  // in cents
            transfer_data: {
                destination: item.postedBy.stripe_account_id,
            },
        },  
        // success and cancel url
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}/${item._id}`,     
    });
    // add the session object to user in the db
    await User.findByIdAndUpdate(req.auth._id, {stripeSession: session}).exec();
    // console.log('SESSION =====>', session);
    // send the session id
    res.send({
        sessionId: session.id,
    });
};

export const stripeSuccess = async (req, res) => {
    try {
        // get hotel Id from the req body
        const {hotelId} = req.body;
        // find currently logged in user
        const user  = await User.findById(req.auth._id).exec();
        // check if user has stripe session
        if(!user.stripeSession) return; 
        // retrieve stripe session by session Id. Session is previously saved in user database
        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
        // check session payment success;
        if(session.payment_status === 'paid') {
            // check if order with taht session already exist by querying orders collection
            const orderExist = await Order.findOne({"session.id": session.id}).exec();
            if (orderExist) {
                // order already exists
                res.json({success: true});
            } else {
                // create a new order
                let newOrder = await new Order({
                    hotel: hotelId,
                    session,  // same name, so this is enough
                    orderedBy: user._id,
                }).save();
                // remove user's stripeSession
                await User.findByIdAndUpdate(user._id, {
                    $set: {stripeSession: {} },
                });
                // send response
                res.json({success: true});
            }
        }
    } catch (err) {
        console.log("STRIPE SUCCESS ERR", err)
    }
};