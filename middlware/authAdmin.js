const { required } = require('joi');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
// const User = require('../models/user');
const db = require('../models');
const Role = db.role;
const User = db.user;
// const db = require("../models");
// const User = db.user;
// const Post = db.posts;

require('dotenv').config();

//Validation de l'identité de l'utlisateur.

////Vérification des droits utilisateurs et administrateurs////

//1//Un modérateur qui administre l'ensemble des publications.

//2//Un administrateur réseaux qui à accès et peut agir sur l'ensemble du site.

//3//Un utilisateur doit être administrateur de son profil et de ses publications.

//4//Vérifier : Les droits pour la modification ou la suppression du profil.


//Administrateur  : Vérifier Les droits administrateurs réseaux.
exports.isAdmin = (req, res, next) => {
    console.log("---->ROUTE isAdmin");
    console.log(req.params.id);
    console.log({ _id: req.params.id });
    console.log("---->CONTENU: req.body");
    console.log(req.body);
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const connectAdmin = req.params.id;
        User.findOne({ where: { _id: connectAdmin } })
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


//Utilisateurs : Vérifier : Les droits administrateurs locaux.
//A utliser sur les routes put et delete.
exports.postUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const postId = req.params.id;
        Post.findOne({ _id: postId })
            .then(post => {
                if (userId === post.userId) {
                    req.token = token;
                    req.user = userId;
                    next();
                } else {
                    res.status(401).json({ error: error | "Vous n'êtes pas le propriètaire de ce compte !!!" });
                }
            });
    } catch (error) {
        res.status(500).json({ error });
    }
};


