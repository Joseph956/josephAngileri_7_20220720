const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

//Validation de l'identité de l'utlisateur.

////Vérification des droits utilisateurs et administrateurs////

//1//Un modérateur qui administre l'ensemble des publications.

//2//Un administrateur réseaux qui à accès et peut agir sur l'ensemble du site.

//3//Un utilisateur doit être administrateur de son profil et de ses publications.

//4//Vérifier : Les droits pour la modification ou la suppression du profil.


//Administrateur  : Vérifier Les droits administrateurs réseaux.
module.exports.isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const isAdmin = req.params.id;
        User.findOne({ where: isAdmin })
            .then(user => {
                if (userId === user.userId) {
                    req.token = token;
                    req.user = userId;
                    next();
                } else {
                    res.status(401).json({ error: error | "Vous n'avez pas les droits administrateur !!!" });
                }
            });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//Modérateur : Vérifier les droits administrateurs du modérateur du site.
module.exports.isModerateur = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const isModerateur = req.params.id;
        User.findOne({ _id: isModerateur })
            .then(user => {
                if (userId === user.userId) {
                    req.token = token;
                    req.user = userId;
                    next();
                } else {
                    res.status(401).json({ error: error | "Vous n'êtes pas le modérateur des publications !!!" });
                }
            });
    } catch (error) {
        res.status(500).json({ error });
    }
};


//Utilisateurs : Vérifier : Les droits administrateurs locaux.
//A utliser sur les routes put et delete.
module.exports.isUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const isUser = req.params.id;
        User.findOne({ _id: isUser })
            .then(user => {
                if (userId === user.userId) {
                    req.token = token;
                    req.user = userId;
                    next();
                } else {
                    res.status(401).json({ error: error | "Vous n'êtes pas l'administrateur de votre compte !!!" });
                }
            });
    } catch (error) {
        res.status(500).json({ error });
    }
};


