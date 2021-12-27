const db = require("../models");
const User = db.user;
const fs = require('fs');
const user = require("../models/user");

//Lister tous les utilisateurs (ok).
exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: (req.body.user),
            attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
            order: [["createdAt", "DESC"]],
        });
    }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "Les profils utilisateurs n'ont pas été trouvés !",
            });
        } else {
            res.status(200).json(user)
        }
    }).catch((err) => {
        res.status(500).json({
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
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
        order: [["createdAt", "DESC"]],
    }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "Le profil utilisateur n'a pas été trouvé !",
            });
        } else {
            res.status(200).json(user)
        }
    }).catch(error => res.status(500).json({ error }));
};

exports.createAttachment = (req, res, next) => {
    const userProfil = JSON.parse(req.body.user);
    delete userProfil._id;
    const user = new User({
        ...userProfil,
        attachment: `${req.protocol}://${req.get("host")}/images/profil${req.file.filename}`
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Profil enregistré !' }))
        .catch(error => res.status(400).json({ error })
        );
};

// Modifier un profil utilisateur. (ok) (a voir pour les images !!?).
exports.updateProfil = (req, res, next) => {
    if (req.file) {
        User.findOne({
            where: { id: req.params.id }
        }).then(user => {
            const filename = user.attachment.split("/images/profil")[1];
            fs.unlink(`images/profil/${filename}`, (error) => {
                if (error) throw error;
            })
        }).catch(err => res.status(500).json({ err }));
    } else {
        const userProfil = req.file ? {
            ...JSON.parse(req.body.user),
            attachment: `${req.protocol}://${req.get("host")}/images/profil${req.file.filename}`
        } : { ...req.body }
        User.update({
            ...userProfil, id: req.params.id
        }, {
            where: { id: req.params.id }
        }).then((data) => {
            if (data[0] === 0) {
                return res.status(404).json({
                    message: "Le profil utilisateur n'a pas été trouvé !",
                });
            } else {
                res.status(200).json({ message: "Le profil utilisateur a été modifié !" });
            }
        }).catch(err => res.status(500).json({ err }))
    }
};

//Supprimer un profil (ok)
exports.deleteProfil = (req, res, next) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Le profil a été supprimé avec succès!"
            });
        } else {
            res.status(400).send({
                message: `Impossible de supprimer le profil id=${id}!`
            });
        }
    }).catch(err => {
        res.status(500).send({ err });
    });
};
