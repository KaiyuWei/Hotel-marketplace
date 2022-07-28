import User from '../models/user';

// test comment
export const register = async (req, res) => {
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
    try {
        await user.save();
        console.log('USER CREATED ', user);
        return res.json({ ok: true });
    } catch {
        console.log('CREATE USER FAILED ', err)
        return res.status(400).send('Error. Try again.');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user with that email exist
        let user = await User.findOne({ email }).exec();
        if (!user) res.status(400).send("User with that email not found");
        // compare password
        user.comparePassword(password, (err, match) => {
            console.log('COMPARE PASSWORD IN LOGIN ERR', err);
            if (!match || err) return res.status(400).send('Wrong password');
            console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT");
        });
    } catch(err) {  // forgot to pass "err" to catch here, but it is necessary, otherwise err is undefined in the body
        console.log('LOGIN ERROR', err);
        res.status(400).send("Sign in failed");
    }
};