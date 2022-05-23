const db = require("../models");
const User = db.user;
const Post = db.posts;
const Like = db.likes;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//Lister tous les posts (ok).
exports.findAllPublished = async (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
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
                likes: req.params.likeId,
                attributes: ['likes'],
                order: [["created", "DESC"]]
            }
        ],
        order: [["createdAt", "DESC"]],
        attributes: {
            exclude: ['updateAt']
        }
    }).then(posts => {
        console.log(posts);
        res.status(200).json(posts);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des publications.",
        });
    });
};
//Récupérer un seul post (ok).
exports.findOnePublished = async (req, res, next) => {
    const userId = req.params.id;
    Post.findOne({
        where: {
            id: userId
        },
        include: [{
            model: db.user,
            attributes: ['username', 'attachment']
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
            likes: req.params.likeId,
            attributes: ['likes'],
            order: [["created", "DESC"]]
        }
        ],
    }).then(post => {
        console.log(post);
        res.status(200).json(post);
    }).catch(error => {
        res.status(400).json({ error })
    });
};
// Créer un nouveau post(ok).
exports.createPost = async (req, res, next) => {
    const post = new Post({
        ...req.body,
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    post.save().then(() => {
        res.status(201).json({ message: 'Objet enregistré !' })
    }).catch((error) => {
        res.status(400).json({ error, message: "Le post n'a pas été créé !!!" })
    });
};
//Mettre à jour le post (image ok).
exports.updatePost = async (req, res, next) => {
    if (req.file) {
        Post.findOne({
            where: { id: req.params.id },
        }).then(postObject => {
            if (postObject.attachment != null) {

                const filename = postObject.attachment.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    console.log(req.file);
                    const postObject = req.file ?
                        {
                            ...req.body,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {
                            ...req.body
                        }
                    console.log(postObject);
                    Post.update({ ...postObject, id: req.params.id }, {
                        where: { id: req.params.id }
                    }).then(() => res.status(200).json({
                        message: "Le post (avec image) a été modifié !"
                    })).catch(() => res.status(400).json({
                        message: "Le post (avec image) n'a pas été modifié !"
                    }));
                });
            } else {
                const postObject = { ...req.body };
                Post.update({ ...postObject, id: req.params.id }, {
                    where: { id: req.params.id }
                }).then(() => res.status(200).json({
                    message: "Le post a été modifié !"
                })).catch(() => res.status(400).json({
                    message: "Le post n'a pas été modifié !"
                }));
            }
        }).catch(() => res.status(404).json({
            Message: 'Aucun post n\'est trouvé avec cet identifiant'
        }));
    } else {
        const postObject = { ...req.body };
        Post.update({ ...postObject, id: req.params.id }, {
            where: { id: req.params.id }
        }).then(() => res.status(200).json({
            message: "Le post a été modifié !"
        })).catch(() => res.status(400).json({
            message: "Le post n'a pas été modifié !"
        }));
    }
};
//Supprimer un post (ok).
exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    Post.findOne({
        where: { id: id },
    }).then((post) => {
        if (post.attachment) {
            const filename = post.attachment.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
                if (error) console.log(error);
            });
        }
        Post.destroy({
            where: { id: id }
        }).then(() => res.status(200).json({
            message: 'Post supprimé!'
        })).catch(() => res.status(400).json({
            message: "Le post n'a pas été supprimé"
        }));
    }).catch(() => res.status(500).json({ message: "Erreur serveur" }))
};
// exports.likePost = async (req, res, next) => {

//     console.log("--------->CONTENU ctrl like : req.body");
//     console.log(req.body);
//     console.log("--------->CONTENU ctrl like : req.params");
//     console.log(req.params);
//     console.log("--------->id en _id");
//     console.log({ _id: req.params.id });




//like = 0 (like = 0, pas de vote)

//like = -1 (dislike = +1)

//like = 0 (dislike = 0, pas de vote)

// const postId = req.params.id;
// const userId = req.params.userId;
// const likeObject = req.body;
// Like.findOne({
//     where: {
//         _id: req.params.id,
//         userId: userId,
//         postId: postId,
//     },
//     include: [
//         {
//             model: db.user,
//             attributes: ['username']
//         },
//         {
//             model: db.likes,
//             likes: req.params.likeId,
//             attributes: ['likes'],
//             order: [["created", "DESC"]]
//         }
//     ],
//     order: [["createdAt", "DESC"]],
//     attributes: {
//         exclude: ['updateAt']
//     }
// }).then((likeFound) => {
//     if (likeFound) {
//         Like.update({
//             userId: userId,
//             postId: postId,
//             likes: 1
//         }, {
//             where: { id: likeFound.id },
//         }).then(() => res.status(200).json({
//             message: 'Like modifié avec succés!'
//         })).catch(error => res.status(400).json({ error, message: "Le like n'a pas été modifié !!!" }));
//     } else {
//         Like.create({
//             userId: userId,
//             postId: postId,
//             likes: 1
//         }).then(() => res.status(201).json({
//             message: 'Like créé avec succés!'
//         })).catch(error => res.status(400).json({ error, message: "Le like n'a pas été créé !!!" }));
//     }
// }).catch(error => res.status(500).json({ error }));
//like = 1 (like = +1)
//si userliked est false et si like === 1
// if (likeObject === 1) {
//     Like.update({
//         likes: 1
//     }, {
//         where: { _id: req.params.id },
//     }).then(() => res.status(201).json({
//         message: "un like est ajouté !"
//     })).catch((error) => res.status(400).json({
//         error
//     }));
// } else if (likeObject === -1) {
//     Like.update({
//         likes: 1
//     }, {
//         where: { id: likeObject.id },
//     }).then(() => res.status(201).json({
//         message: "un dislike est ajouté !"
//     })).catch((error) => res.status(400).json({
//         error
//     }));
// } else {
//     Like.findOne({
//         _id: req.params.id
//     }).then((likeObject) => {

//     })
// }
// };
exports.likePost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.params.userId;
    console.log(postId);
    console.log(userId);
    Like.findOne({
        where: {
            userId: userId,
            postId: postId
        },
        include: [
            {
                model: db.user,
                attributes: ['username']
            },
        ],
    }).then(likeFound => {
        if (likeFound) {
            Like.update({
                likes: 1
            }, {
                where: { id: likeFound.id },
            }).then(() => res.status(200).json({
                message: 'Like modifié avec succés!'
            })).catch(error => res.status(400).json({ error, message: "Le like n'a pas été modifié !!!" }));
        } else {
            Like.create({
                userId: userId,
                postId: postId,
                likes: 1
            }).then(() => res.status(201).json({
                message: 'Like créé avec succés!'
            })).catch(error => res.status(400).json({ error, message: "Le like n'a pas été créé !!!" }));
        }
    }).catch(error => res.status(500).json({ error }));

};
exports.unLikePost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user;
    Like.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    }
    ).then(likeFound => {
        if (likeFound) {
            Like.update({
                likes: -1
            }, {
                where: { id: likeFound.id },
            }).then(() => res.status(200).json({
                message: 'Like modifié avec succés!'
            }))
        } else {
            Like.create({
                userId: userId,
                postId: postId,
                likes: -1
            }).then(() => res.status(201).json({
                message: 'Like créé avec succés!'
            }))
        }
    })
        .catch(error => res.status(400).json({ error }));
};