const db = require('../models');
const User = db.user;
const Role = db.role;
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// const { BOOLEAN } = require('sequelize');
const { validate } = require('uuid');
dotenv.config();

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            Role.findOne({
                where: {
                    role: "user"
                }
            }).then(role => {
                if (role != null) {
                    user.roleId = role.id;
                    user
                        .save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                } else {
                    res.status(500).json("No user rôle found");
                }
            });
        }).catch(error => res.status(500).json({ error }));
};

exports.signIn = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: 'Profil utilisateur inexistant !' });
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
                    res.status(200).json({
                        userId: user.id,
                        role: role,
                        token: jwt.sign({
                            userId: user.id,
                            role: role,
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
    res.Cookies('sessionId', '', { maxAge: 1 })
    res.redirect('/');
};

exports.newPasswd = (req, res, next) => {
    // if (!req.password) {
    //     res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    // }
    try {
        const newPasswd = req.body.newPasswd;
        User.update({
            password: user.password
        });
        bcrypt.compare(newPasswd, user.password, (errPasswd) => {
            if (errPasswd) {
                res.status(406).json({ error: 'Le mot de passe doit être différent' })
            } else {
                bcrypt.hash(newPasswd, 10, function (err, bcryptNewPasswd) {
                    User.update(
                        { password: bcryptNewPasswd },
                        { where: { id: user.id } }
                    )
                }).then(() => res.status(201).json({ confirm: 'Mot de passe modifié avec succès' }
                )).catch(err => res.status(500).json(err))
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
    // res.send('Créer un nouveau mot de passe utlisateur !!!');
};
