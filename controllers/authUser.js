const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

exports.signup = (req, res, next) => {

    res.send('auth signup route "Creer un nouveau compte"');
};

exports.login = (req, res, next) => {

    res.send('auth login route');
};

exports.logout = (req, res, next) => {

    res.send('auth logout route');
};