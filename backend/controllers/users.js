const db = require("../models");
const User = db.user;
const Post = db.posts;
const Role = db.role;
const fs = require('fs');

exports.findAllPublished = async (req, res, next) => {
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
                            attributes: ['username', 'attachment', 'imgBottom']
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
                            attributes: ['username', 'attachment', 'imgBottom']
                        }
                    ],
                },
                {
                    model: db.likes,
                    likes: req.body.likeId,
                    attributes: ['likes'],
                    order: [["created", "DESC"]],
                    include: [
                        {
                            model: db.user,
                            attributes: ['username', 'attachment', 'imgBottom']
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
    }).catch((error) => {
        res.status(500).json({
            message:
                error.message ||
                "Une erreur s'est produite lors de la récupération des fiches utilisateurs.",
        });
    });
};
exports.findOneProfil = async (req, res, next) => {
    const userId = req.params.id;
    console.log("--------->Contenu findOneProfil : userId");
    console.log(userId);
    User.findOne({
        where: {
            id: userId,
        },
        model: db.user,
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
                    attributes: ['username', 'attachment', 'imgBottom']
                }
            ],
        },
        {
            model: db.likes,
            likes: req.body.likeId,
            attributes: ['likes'],
            order: [["created", "DESC"]]
        },
        ],
        order: [["createdAt", "DESC"]],
    }).then((user) => {
        if (!user) {
            return res.status(401).json({
                message: "Le profil utilisateur n'a pas été trouvé !",
            });
        } else {
            res.status(200).json(user)
        }
    }).catch(error => res.status(500).json({ error }));
};
exports.createImgBottom = async (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
        User.findOne({
            where: { id: id }
        }).then(userObject => {
            if (userObject.imgBottom != null) {
                const filename = userObject.imgBottom.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
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
                        message: "Votre image de fond a été créée !"
                    })).catch((error) => res.status(400).json({
                        error, message: "Votre image de fond n'a pas été créée !"
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
                    message: "L'image de fond de votre profil a été modifiée !"
                })).catch(() => res.status(400).json({
                    message: "L'image de fond de votre profil n'a pas été modifiée !"
                }));
            }
        }).catch((e) => res.status(400).json({ Message: 'Aucun profil n\'est trouvé avec cet identifiant' + e }));

    } else {
        const userObject = { ...req.body };
        User.update({
            ...userObject, id: req.params.id
        }, {
            where: { id: id }
        }).then(() => res.status(200).json({
            message: "L'image de fond de votre profil utilisateur a été modifié !"
        })).catch(() => res.status(400).json({
            message: "L'image de fond de votre profil utilisateur n'a pas été modifié !",
        }));
    }
};
exports.deleteImgBottom = async (req, res, next) => {
    try {
        const id = req.params.id;
        User.findOne({
            where: { id: id },
            model: db.user,
            attributes: ['imgBottom', 'attachment', 'username', 'email', 'roleId'],
        }).then(userObject => {
            if (userObject.imgBottom != null) {
                const filename = userObject.imgBottom.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => { });
                User.update({
                    "imgBottom": null
                }, {
                    where: { id: id }
                }).then(() => res.status(200).json({
                    message: "Votre image de fond a été supprimée !"
                })).catch(() => res.status(400).json({
                    message: "Votre image de fond n'a pas été modifiée !"
                }));

            } else {
                res.status(400).json({
                    message: "Il n'\y a pas d'\image de couverture à supprimer !!!"
                })
            }
        }).catch((error) => { })
    } catch (err) {
        res.status(500).send({ err, message: "La suppression de l'\image de fond à échoué !!!" });
    }
};
exports.publierProfil = async (req, res, next) => {
    const userId = req.params.id;
    console.log("-------->Contenu publierProfil : userId");
    console.log(userId);
    User.findOne({
        where: {
            id: userId,
        },
        model: db.user,
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
                    attributes: ['username', 'attachment', 'imgBottom']
                }
            ],
        },
        {
            model: db.likes,
            likes: req.body.likeId,
            attributes: ['likes'],
            order: [["created", "DESC"]]
        },
        ],
        order: [["createdAt", "DESC"]],
    }).then((user) => {
        if (!user) {
            console.log("-------> Contenu : user");
            console.log(user);
            return res.status(401).json({
                message: "Le profil utilisateur n'a pas été trouvé !",
            });
        } else {
            res.status(200).json(user)
        }
    }).catch(error => res.status(500).json({ error }));
};
exports.updateProfil = async (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
        User.findOne({
            where: { id: id },
        }).then(userObject => {
            if (userObject.attachment != null) {
                const filename = userObject.attachment.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    const userObject = req.file ?
                        {
                            ...req.body,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {
                            ...req.body
                        }
                    User.update({ "username": userObject.username, "attachment": userObject.attachment }, {
                        where: { id: id }
                    }).then(() => res.status(200).json({
                        message: "L'image de votre profil a été mis à jour !"
                    })).catch(() => res.status(400).json({
                        message: "L'image de votre profil n'a pas été modifié !"
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
                User.update({ "username": userObject.username, "attachment": userObject.attachment }, {
                    where: { id: id }
                }).then(() => res.status(200).json({
                    message: "La photo de votre profil a été mis à jour !"
                })).catch((error) => res.status(400).json({
                    message: "La photo de votre profil n'a pas été modifié !" + error
                }));
            }
        }).catch((e) => res.status(400).json({ Message: 'Aucun profil n\'est trouvé avec cet identifiant' + e }));

    } else {
        const userObject = { ...req.body };
        User.update({ "username": userObject.username }, {
            where: { id: id }
        }).then(() => res.status(200).json({
            message: "Les informations de votre profil ont été mis à jour !"
        })).catch(() => res.status(400).json({
            message: "Les informations de votre profil n'ont pas été modifié !",
        }));
    }
};
exports.deleteProfil = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        const role = await Role.findOne({ where: { id: user.roleId } });
        if (role.role == 'admin') {
            res.status(401).send({
                message: "Le compte administrateur ne peut pas être supprimé !!! "
            })
        } else {

            if (user.attachment !== null) {
                const filename = user.attachment.split("/images/")[1];
                fs.unlink(`images//${filename}`, () => {
                });
            }
            if (user.imgBottom !== null) {
                const filename = user.imgBottom.split("/images/")[1];
                fs.unlink(`images//${filename}`, () => {
                });
            }
            Post.findAll({
                where: { userId: id },
            }).then(posts => {
                for (i = 0; i < posts.length; i++) {
                    if (posts[i].attachment !== null) {
                        const filename = posts[i].attachment.split("/images/")[1];
                        fs.unlink(`images//${filename}`, () => {
                        });
                    }
                }
            }).catch((err) => {

            });
            User.destroy({
                where: { id: id },
            }).then(() => res.status(200).send({
                message: "Le profil a été supprimé avec succès!"
            })).catch(() => res.status(400).send({
                message: `Impossible de supprimer le profil id=${id}!`
            }));
        }
    } catch (err) {
        res.status(500).send({ err: err, message: "La suppression du profil à échoué !!!" });
    }
};


