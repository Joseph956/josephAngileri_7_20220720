const db = require("../models");
const User = db.user;

//Lister tous les utilisateurs.
exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: req.body.user,
            order: [["createdAt", "DESC"]],
        });
    }).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des fiches utilisateurs.",
        });
    });
};

exports.findOneById = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findOne({
            user: req.body.user,
            order: [["createdAt", "DESC"]],
        });
    }).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des fiches utilisateurs.",
        });
    });
    // res.send('Afficher une fiche utilisateur par son id !!!');
};


exports.create = (req, res, next) => {

    res.send('Créer une nouvelle fiche utlisateur !!!');
};

exports.modifyUserById = (req, res, next) => {

    res.send('Modifier la fiche utilisateur !!!');
};

exports.deleteUserById = (req, res, next) => {

    res.send('Supprimer la fiche utilisateur !!!');
};