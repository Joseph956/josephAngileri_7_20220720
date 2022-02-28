const db = require("../models");
const User = db.user;
const Post = db.posts;
const Coment = db.coments;
const jwt = require('jsonwebtoken');
const passwrdValidator = require('password-validator');
const emailSchema = require('validator');
require('dotenv').config();

//Verification que le token est valide (ok).
module.exports.token = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.token = token;
                req.user = userId;
                next();
            } else {
                return res.status(401).send({
                    message: "Aucun utilisateur trouvé avec ce jeton !",
                });
            }
        });
    } catch (error) {
        res.status(403).json({ error: error + 'Requête non authentifiée !' });
    }
};

//Verification que le token a les droit sur le post (ok).
module.exports.haveRightOnPost = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const post = req.params.id;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                console.log("   role: " + role.role);
                if (role.role == "admin") {
                    return next();
                } else {
                    Post.findByPk(post).then(
                        (foundedPost) => {
                            if (foundedPost.userId == userId) {
                                return next();
                            } else {
                                return res.status(403).send({
                                    message: "Sécurité : Vous n'avez pas les droits nécessaires pour modifier ce post !",
                                });
                            }
                        })
                }
            } else {
                return res.status(401).send({
                    message: "Aucun utilisateur trouvé avec ce jeton !",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};

//Vérification que le token a les droits sur les commentaires (ok). 
module.exports.haveRightOnComent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const coment = req.params.id;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                console.log("   role: " + role.role);
                if (role.role == "admin") {
                    return next();
                } else {
                    Coment.findByPk(coment).then((foundedComent) => {
                        console.log("----->CONTENU: foundedComent");
                        console.log(foundedComent);
                        if (foundedComent.userId == userId) {
                            return next();
                        } else {
                            return res.status(403).send({
                                message: "Sécurité : Vous n'avez pas les droits necessaires pour modifier ce commentaire !",
                            });
                        }
                    })
                }
            } else {
                return res.status(401).send({
                    message: "Aucun utilisateur trouvé avec ce jeton !",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};

//Verification que le token a les droits sur le profil (ok).
module.exports.haveRightOnProfile = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        User.findByPk(userId).then((user) => {
            if (user) {
                req.user = userId;
                console.log("   role: " + role.role);
                if (role.role == "admin") {
                    return next();
                } else if (userId === req.params.id) {
                    return next();
                } else {
                    return res.status(403).send({
                        message: "Sécurité : Vous n'avez pas les droits necessaires pour modifier ce compte utilisateur !",
                    });
                }
            } else {
                return res.status(401).send({
                    message: "Aucun utilisateur trouvé avec ce jeton !",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};

//Contrôle de l'Email (ok).
module.exports.email = (req, res, next) => {
    if (emailSchema.isEmail(req.body.email)) {
        next();
    } else {
        return res.status(400).json({
            error: "Veuillez saisir un email valide !"
        });
    }
};

//Contrôle du mot de passe (ok).
const passwdSchema = new passwrdValidator();
passwdSchema
    .is().min(8).is().max(1024).has().uppercase().has()
    .lowercase().has().digits(2).has().symbols(1)
    .has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123']);

module.exports.passwd = (req, res, next) => {
    if (passwdSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            error: "Le mot de passe n'est pas assez fort :" +
                passwdSchema.validate(req.body.password, { list: true })
        })
    }
};


//Justificatif d'identité : 
// Vérifie que le token utlisé pour faire une création ou une modification correspond au token d'authentification de l'utilisateur connecté.
module.exports.credential = (req, res, next) => {

};