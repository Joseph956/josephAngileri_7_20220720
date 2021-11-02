const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//chiffrage de l'email
const cryptoJs = require('crypto-js');

const User = require('../models/users_table');

exports.signup = (req, res, next) => {

    res.send('auth signup route "Creer un nouveau compte"');
};

exports.login = (req, res, next) => {

    res.send('auth login route');
};

exports.logout = (req, res, next) => {

    res.send('auth logout route');
};