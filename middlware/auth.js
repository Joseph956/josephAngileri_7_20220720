const db = require("../models");
const User = db.user;
const Post = db.posts;
const Coment = db.coments;
const jwt = require('jsonwebtoken');
const passwrdValidator = require('password-validator');
const emailSchema = require('validator');
const coment = require("../models/coment");
require('dotenv').config();

//Verification que le token est valide.
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
                    message: "Aucun utilisateur trouvé avec ce jéton !",
                });
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};

//Verification que le token a les droit sur le post
module.exports.haveRightOnPost = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const post = req.params.id;
        console.log(req.params);
        console.log(post);
        User.findByPk(userId).then((user) => {
            if (user) {
                req.token = token;
                req.user = userId;
                // On verifie si l'utilisateur est admin
                if (role == "admin") {
                    return next();
                } else {
                    Post.findByPk(post).then((foundedPost) => {
                        console.log(foundedPost);
                        if (foundedPost.userId == userId) {
                            return next();
                        } else {
                            return res.status(403).send({
                                message: "Vous n'avez pas les droits necessaires pour cette action !",
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

//Vérification que le token a les droits sur les commentaires.
module.exports.haveRightOnComent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const coment = req.params.id;
        console.log(req.params);
        console.log(coment);
        User.findByPk(userId).then((user) => {
            if (user) {
                req.token = token;
                req.user = userId;
                // On verifie si l'utilisateur est admin
                if (role == "admin") {
                    return next();
                } else {
                    Coment.findByPk(coment).then((foundedComent) => {
                        console.log(foundedComent);
                        if (foundedComent.userId == userId) {
                            return next();
                        } else {
                            return res.status(403).send({
                                message: "Vous n'avez pas les droits necessaires pour cette action !",
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

//Vérification que le token a les droits sur les likes.
module.exports.haveRightOnLike = (req, res, next) => {

};

//Verification que le token a les droits sur le profil.
module.exports.haveRightOnProfile = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        console.log(role);
        //@TOTO UN VERIF POUR LES PROFILE

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};


//Contrôle de l'Email.
module.exports.email = (req, res, next) => {
    if (emailSchema.isEmail(req.body.email)) {
        next();
    } else {
        return res.status(400).json({
            error: "Veuillez saisir un email valide !"
        });
    }
};

//Contrôle du mot de passe.
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