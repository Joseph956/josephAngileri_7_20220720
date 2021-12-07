const db = require("../models");
const User = db.user;
const fs = require('fs');

//Lister tous les utilisateurs (ok).
exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: (req.body.user),
            attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
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

//Appeler un profil utilisateur par son id (ok).
exports.findOneProfil = (req, res, next) => {
    User.findOne({
        user: (req.body.user),
        attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
        order: [["createdAt", "DESC"]],
    }).then(user => {
        res.status(200).json(user)
    }).catch(error => res.status(400).json({ error }));
};

// Modifier un profil utilisateur. (ok) (a voir pour les images !!?).
//Faire la vérification de l'existence du compte avant de faire le traitement.
exports.updateProfil = (req, res, next) => {
    const userProfil = req.file ? {
        ...req.body.userId,
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body }
    User.update({
        ...userProfil, id: req.params.id
    }, {
        where: { id: req.params.id }
    }).then(() => res.status(200).json({ message: "Le profil utilisateur a été modifié !" }
    )).catch(err => res.status(400).json({ err }))
};

//Supprimer un profil (ok)
exports.deleteProfil = (req, res, next) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Le profil a été supprimé avec succès!"
                });
            } else {
                res.status(400).send({
                    message: `Impossible de supprimer le profil id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ err });
        });
};
