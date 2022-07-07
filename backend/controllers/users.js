const db = require("../models");
const User = db.user;
const Role = db.role;
const fs = require('fs');

exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: (req.body.user),
            attributes: ['id', 'imgBottom', 'attachment', 'username', 'email', 'roleId'],
            include: [
                {
                    model: db.posts,
                    post: req.params.postId,
                    attributes: ['id', 'content', 'userId'],
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: db.user,
                            attributes: ['username', 'attachment']
                        }
                    ],
                },
                {
                    model: db.coments,
                    coment: req.params.comentId,
                    attributes: ['id', 'coment', 'userId'],
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: db.user,
                            attributes: ['username', 'attachment']
                        }
                    ],
                },
            ],
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
exports.findOneProfil = (req, res, next) => {
    const userId = req.params.id;
    User.findOne({
        where: {
            id: userId,
        },
        // model: db.user,
        attributes: ['id', 'imgBottom', 'attachment', 'username', 'email', 'roleId'],
        include: [{
            model: db.posts,
            attributes: ['id', 'title', 'content', 'attachment']
        },
        {
            model: db.coments,
            coment: req.params.comentId,
            attributes: ['id', 'coment', 'userId'],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.user,
                    attributes: ['username', 'attachment']
                }
            ],
        },
        {
            model: db.likes,
            likes: req.body.likeId,
            attributes: ['likes'],
            order: [["created", "DESC"]]
        },
        {
            model: db.unlikes,
            likes: req.body.likeId,
            attributes: ['unlikes'],
            order: [["created", "DESC"]]
        }
        ],
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
    const id = req.params.id;
    console.log("/" + id + "/");
    if (req.file) {
        console.log("--------->METHODE PUT PROFIL : req.file");
        console.log(req.file);
        User.findOne({
            where: { id: id }
        }).then(userObject => {
            if (userObject.imgBottom != null) {
                const filename = userObject.imgBottom.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    console.log(req.file);
                    const userObject = req.file ?
                        {
                            ...req.body,
                            imgBottom: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {
                            ...req.body
                        }
                    console.log(userObject);
                    User.update({ ...userObject, id: req.params.id }, {
                        where: { id: id }
                    }).then(() => res.status(200).json({
                        message: "Le profil a été mis à jour !"
                    })).catch(() => res.status(400).json({
                        message: "Le profil (avec image) n'a pas été modifié !"
                    }));
                });
            } else {
                const userObject = req.file ?
                    {
                        ...req.body,
                        imgBottom: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {
                        ...req.body
                    }
                console.log(userObject);
                User.update({ ...userObject, id: req.params.id }, {
                    where: { id: id }
                }).then(() => res.status(200).json({
                    message: "Le profil a été modifié !"
                })).catch(() => res.status(400).json({
                    message: "Le profil (avec image) n'a pas été modifié !"
                }));
            }
            console.log("----->CONTENU : filename profil");


        }).catch((e) => res.status(404).json({ Message: 'Aucun profil n\'est trouvé avec cet identifiant' + e }));

    } else {
        const userObject = { ...req.body };
        User.update({
            ...userObject, id: req.params.id
        }, {
            where: { id: id }
        }).then(() => res.status(200).json({
            message: "Le profil utilisateur a été modifié !"
        })).catch(() => res.status(400).json({
            message: "Le profil utilisateur n'a pas été modifié !",
        }));
    }
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
exports.updateProfil = async (req, res, next) => {
    const id = req.params.id;
    console.log("/" + id + "/");
    if (req.file) {
        User.findOne({
            where: { id: id }
        }).then(userObject => {
            if (userObject.attachment != null) {
                const filename = userObject.attachment.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    console.log(req.file);
                    const userObject = req.file ?
                        {
                            ...req.body,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {
                            ...req.body
                        }
                    console.log(userObject);
                    User.update({ ...userObject, id: req.params.id }, {
                        where: { id: id }
                    }).then(() => res.status(200).json({
                        message: "Le profil a été mis à jour !"
                    })).catch(() => res.status(400).json({
                        message: "Le profil (avec image) n'a pas été modifié !"
                    }));
                });
            } else {
                const userObject = req.file ?
                    {
                        ...req.body,
                        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {
                        ...req.body
                    }
                console.log(userObject);
                User.update({ ...userObject, id: req.params.id }, {
                    where: { id: id }
                }).then(() => res.status(200).json({
                    message: "Le profil a été modifié !"
                })).catch(() => res.status(400).json({
                    message: "Le profil (avec image) n'a pas été modifié !"
                }));
            }
        }).catch((e) => res.status(404).json({ Message: 'Aucun profil n\'est trouvé avec cet identifiant' + e }));
    } else {
        const userObject = { ...req.body };
        User.update({
            ...userObject, id: req.params.id
        }, {
            where: { id: id }
        }).then(() => res.status(200).json({
            message: "Le profil utilisateur a été modifié !"
        })).catch(() => res.status(400).json({
            message: "Le profil utilisateur n'a pas été modifié !",
        }));
    }
};
//Desactiver le profil est plus approprié.
exports.deleteProfil = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        const role = await Role.findOne({ where: { id: user.roleId } });
        if (role.role == 'admin') {
            res.status(401).send({
                message: "Le compte administrateur ne peut pas être supprimé !!! "
            });
        } else if (user.attachment !== null) {
            const filename = user.attachment.split("/images/")[1];
            fs.unlink(`images//${filename}`, () => {
                User.destroy({ where: { id: id } });
                res.status(200).send({
                    message: "L'image de profil a été supprimée avec succès !!!"
                });
            });
        } else {
            User.destroy({
                where: { id: id },
            }).then(() => res.status(200).send({
                message: "Le profil a été supprimé avec succès!"
            })).catch(() => res.status(400).send({
                message: `Impossible de supprimer le profil id=${id}!`
            }));
        }
    } catch (err) {
        res.status(500).send({ err, message: "La suppression du profil à échoué" });
    }
};
