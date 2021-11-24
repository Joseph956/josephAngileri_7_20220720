const db = require('../models');
const User = db.user;
const Role = db.role;
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { BOOLEAN } = require('sequelize');
dotenv.config();

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            user
                .save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signIn = (req, res, next) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inexistant !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(403).json({ error: 'Le mot de passe est incorrect !' });
                    }
                    //GET LOGGED USER ROLE
                    Role.findOne({
                        where: { id: user.roleId }
                    }).then(role => {
                        console.log('---->CONTENU: role');
                        console.log('role =', role);
                        res.status(200).json({
                            userId: user.id,
                            role: role.role,
                            token: jwt.sign({
                                userId: user.id,
                                role: role.role,
                            },
                                process.env.RANDOM_TOKEN_SECRET, { expiresIn: '24h' })
                        });
                    })
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
    new Cookies(req, res).set('snToken', "", {
        httpOnly: true,
        maxAge: 1  // 1ms (= suppression quasi instantannée)
    })
    res.status(200).json({ message: "utilisateur déconnecté" });
};