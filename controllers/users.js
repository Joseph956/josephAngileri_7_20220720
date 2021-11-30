const db = require("../models");
const fs = require('fs');
const User = db.user;

//Lister tous les utilisateurs.
exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: (req.body.user),
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
exports.findOneProfil = (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

//Créer un nouveau profil utilisateur
exports.upload = (req, res, next) => {

    res.send("Modifier l'image de l'utlisateur !!!");
};

exports.newPasswd = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        if (!req.user) {
            const user = {
                id: user.id,
                attachment: user.attachment,

                bio: user.bio,
                // isAdmin: user.isAdmin
            };
            res.status(400).send({
                message: "Tous les champs sont requis!"
            });
            return;
        };
        User.create()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est lors de la création du profil utilisateur!"
                })
            });
    });



    // res.send('Créer une nouvelle fiche utlisateur !!!');
};

//Modifier un profil utilisateur.
exports.updateProfil = (req, res, next) => {

};





//Supprimer un profil (ok)
exports.deleteProfil = (req, res) => {
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
