import User from '../models/user';
import jwt from 'jsonwebtoken';

// test comment
export const register = async (req, res) => {
    try {
        console.log(req.body);  // to make sure that the front end has sent the request to the backend
        const { name, email, password } = req.body;
        //validation
        if (!name) return res.status(400).send('Name is required!');
        if (!password || password.length < 6)
            return res
                .status(400)
                .send('Password is required and should be minimum 6 characters long!');
    
        let userExist = await User.findOne({ email }).exec();
        if (userExist)
            return res.status(400).send('Email is taken!');
        //register
        const user = new User(req.body);
        await user.save();
        console.log('USER CREATED ', user);
        return res.json({ ok: true });
    } catch {
        console.log('CREATE USER FAILED ', err)
        return res.status(400).send('Error. Try again.');
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user with that email exist
        let user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send("User with that email not found");
        // compare password
        user.comparePassword(password, (err, match) => {
            console.log('COMPARE PASSWORD IN LOGIN ERR', err);
            if (!match || err) return res.status(400).send('Wrong password');
            // console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT");
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });
            res.json({token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession,
            }});
        });
    } catch(err) {  // forgot to pass "err" to catch here, but it is necessary, otherwise err is undefined in the body
        console.log('LOGIN ERROR', err);
        res.status(400).send("Sign in failed");
    }
};