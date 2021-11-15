
const db = require('../models');
const User = db.user; //ne pas modifier
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { BOOLEAN } = require('sequelize');
dotenv.config();

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.RANDOM_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signIn = (req, res, next) => {
    User.findOne()
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inexistant !' });
            }
            bcrypt
                .compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(403).json({ error: 'Le mot de passe est incorrect !' });
                    }
                    const { email, password } = req.body
                    const user = User.login({ email, password });
                    const token = createToken(user.id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    token.jwt.sign({ userId: user.id },
                        process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' })
                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.logout = (req, res, next) => {

};