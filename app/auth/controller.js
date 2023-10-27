const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const localStrategy = async (email, password, done) => {
    try {
        let user = await User
            .findOne({ email })
            .select('-__v -createdAt -updatedAt -cart_items -token');
        if (!user) return done();
        if (bcrypt.compareSync(password, user.password)) {
            ({ password, ...userWithoutPassword } = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null)
    }
    done();
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function (err, user) {
        if (err) return next(err);

        if (!user) return res.status(400).json({ 
            error: 1,
            message: 'Email or Password Incorrect' 
        });

        let signeds = jwt.sign(user, config.secretkey, { expiresIn: '1d' });

        await User.findByIdAndUpdate(user._id, { $push: { token: signeds } });

        // localStorage.setItem('tokens', signeds)

        res.cookie('tokensTo', signeds, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            // .cookie("tokensTo", true, { origin: "http://localhost:3009", secure: true, sameSite: 'none'})

        res.json({
            message: 'Login Successfully',
            user,
            token: signeds
        })
    })(req, res, next)
}  

const logout = async (req, res, next) => {
    let logoutt = req.cookies.tokensTo;
    if(!logoutt) return res.sendStatus(204);
    let user = await User.find({ token: logoutt });
    if(!user[0]) return res.sendStatus(204);
    await User.findOneAndUpdate({ token: { $in: [logoutt] } }, { $pull: { token: logoutt } }, { useFindAndModify: false });
    res.clearCookie('tokensTo');
    return res.sendStatus(200);

}

const me = (req, res, next) => {
    if (!req.user) {
        res.json({
            err: 1,
            message: `you're not login or token is expired.!`
        })
    }
    res.json(req.user);
}

module.exports = {
    getUsers,
    register,
    localStrategy,
    login,
    logout,
    me,
}