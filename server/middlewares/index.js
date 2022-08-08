import {expressjwt} from 'express-jwt';

export const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});  // it helps verify if the user stays in login because the JWT_SECRETE was sent to mongodb in login function in server/controller/auth