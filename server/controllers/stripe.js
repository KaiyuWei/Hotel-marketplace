import User from "../models/user";
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
    const user = await User.findById(req.auth._id).exec();  // problem: Ryan uses req.user, but I have to use req.auth
    console.log('USER ==>', user);
    const account = await stripe.accounts.create({
        type: "express",
    });
    console.log("ACCOUNT ===> ", account);
}