const db = require("../models");
const User = db.user;
const fs = require('fs');
// const user = require("../models/user");

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
    const userId = req.params.id;
    User.findOne({
        where: {
            id: userId,
        },
        attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
        include: [{
            model: db.posts,
            attributes: ['id', 'title', 'content', 'attachment']
        }],
        order: [["createdAt", "DESC"]],
    }).then((user) => {
        if (!user) {
            return res.status(403).json({
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
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Profil enregistré !' }))
        .catch(error => res.status(400).json({ error })
        );
};

exports.publierProfil = async (req, res, next) => {
    User.findOne({
        user: (req.body.user),
        // attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        attributes: ['id', 'attachment', 'username', 'email', 'roleId'],
        order: [["createdAt", "DESC"]],
    }).then((user) => {
        if (!user) {
            return res.status(403).json({
                message: "Le profil utilisateur n'a pas été trouvé !",
            });
        } else {
            res.status(200).json(user)
        }
    }).catch(error => res.status(500).json({ error }));
};


// Modifier un profil utilisateur. (ok) (a voir pour les images !!?).
exports.updateProfil = async (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
        User.findOne({
            where: { id: id }
        }).then(user => {
            const filename = user.attachment.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
                if (error) console.log(error);
            });
            User.update({
                attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                id: req.params.id
            }, {
                where: { id: id },
                ...req.body,
                attributes: ['id', 'username', 'content', 'attachment'],
            }).then((user) => res.status(200).json({
                user, message: "Le profil a été modifié !"
            })).catch(() => res.status(400).json({
                message: "Le profil (avec image) n'a pas été modifié !"
            }));
        }).catch(err => res.status(404).json({ err }));
    } else {
        User.update({
            id: req.params.id,
        }, {
            where: { id: id },
            ...req.body,
            attributes: ['id', 'username', 'content', 'attachment'],
        }).then((user) => res.status(200).json({
            user, message: "Le profil (pas d'image) utilisateur a été modifié !"
        })).catch(() => res.status(400).json({
            message: "Le profil utilisateur n'a pas été modifié !",
        }));
    };
};


//Supprimer un profil (ok)
//Desactiver le profil est plus approprié.
exports.deleteProfil = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        if (user.attachment !== null) {
            const filename = user.attachment.split("/images/")[1];
            fs.unlink(`images//${filename}`, () => {
                User.destroy({ where: { id: id } });
                res.status(200).send({ message: "L'image de profil a été supprimé avec succès!" });
            });
        } else {
            User.destroy({
                where: { id: id }
            }).then(() => res.status(200).send({
                message: "Le profil a été supprimé avec succès!"
            })).catch(() => res.status(400).send({
                message: `Impossible de supprimer le profil id=${id}!`
            }));
        };

    } catch (err) {
        res.status(500).send({ err, message: "coucou" });
    }
};
