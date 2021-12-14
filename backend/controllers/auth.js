const db = require('../models');
const User = db.user;
const Role = db.role;
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { BOOLEAN } = require('sequelize');
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
                        .catch(error => res.status(400).json({ error, message: "Ce compte utilisateur existe déjà !!! " }));
                } else {
                    res.status(400).json("Le rôle utilisateur n'a pas été trouvé !!! ");
                }
            });
        }).catch(error => res.status(500).json({ error, message: "erreur serveur !!! " }));
};

exports.signIn = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: "Ce profil utilisateur n'existe pas !!!" });
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
    try {
        const id = req.params.id;
        const oldPasswd = req.body.oldPassword;
        const newPasswd = req.body.newPassword;
        const newPasswdConfirm = req.body.newPasswdConfirm;
        User.findOne({
            where: {
                id: id
            }
        }).then(user => {
            const passwdIsValid = bcrypt.compareSync(
                oldPasswd,
                user.password,
            );
            if (!passwdIsValid) {
                return res.status(401).json({ message: 'Requête non authentifiée !' });
            } else {
                if (newPasswdConfirm === newPasswd) {
                    User.update({ password: bcrypt.hashSync(newPasswd, 4) }, {
                        where: { id: id },
                    }).then((num) => {
                        if (num == 1) {
                            res.send({
                                message: "Le mot de passe a été modifié avec succès.",
                            });
                        } else {
                            res.send({
                                message: `Impossible de mettre à jour le mot de passe avec id=${id}.L'utilisateur n'a pas été trouvé !`,
                            });
                        }
                    }).catch((err) => {
                        res.status(500).send({
                            message: " Erreur lors de la mise à jour du mot de passe avec id=" + id,
                        });
                    });
                } else {
                    res.status(500).send({
                        message: " Le mot de passe saisi et la confirmation ne sont pas identiques !!!"
                    });
                }
            }
        }).catch((err) => { res.status(428).json({ err, message: "Le mot de passe enregistré, et le mot de passe saisi ne corresponde pas !!!" }) })

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};
