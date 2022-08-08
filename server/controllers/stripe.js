import User from "../models/user";
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