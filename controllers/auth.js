const db = require('../models');
const User = db.user; //ne pas modifier
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.RANDOM_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

exports.signUp = async (req, res, next) => {
    console.log(req.body);
    const { username, email, password } = req.body

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ user: user.id });
    }
    catch (err) {
        res.status(200).send({ err })
        console.log(err);
    }
};

exports.signIn = async (req, res, next) => {

    console.log(req.body);
    const { email, password } = req.body

    try {
        const user = await User.login({ email, password });
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        token.jwt.sign({ userId: user.id },
            process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' })
        res.status(200).json({
            user: user.id,
        });
    }
    catch (err) {
        res.status(200).send({ err });
    };
};

exports.logout = (req, res, next) => {

    res.send('auth logout route');
};