const db = require("../models");
const Post = db.posts;
const User = db.user;
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

//Mettre à jour le post (à faire).
exports.updatePost = async (req, res, next) => {
    const postObject = req.file;
    if (postObject) {
        Post.findOne({
            where: { id: req.body.postId },
            where: { id: req.params.id },
        }).then(postObject => {
            const filename = postObject.attachment.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                const postObject = req.file ?
                    {
                        // ...JSON.parse(req.body),
                        ...req.body,
                        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {
                        ...req.body
                    }

                Post.update({ where: { id: req.params.id } }, { ...postObject, where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Objet modifié  fs_link !' }))
                    .catch((error) => res.status(400).json({ error }));
            });
        }).catch(() => res.status(500).json({ Message: 'erreur serveur JOSEPH' }));
    } else {
        //l'objet qui doit être mis à jour dans la base de données

        //Mettre à jour la base de données
        Post.update({ where: { id: req.body.post } }, { ...postObject, where: { id: req.body.post } })
            .then(() => res.status(200).json({
                message: 'La BDD a été mis à jour !',
                contenu: req.body
            }))
            .catch((error) => res.status(400).json({ error }));
    }
};

//Supprimer un post (ok).
// exports.deletePost = (req, res, next) => {
//     const id = req.params.id;
//     Post.findOne({
//         where: {
//             id: userId, id: id
//         },
//         include: [{
//             model: db.user,
//             attributes: ['username', 'attachment']
//         },
//         ],
//         // where: { id: id },
//         // where: { id: req.body.postId },
//     }).then((post) => {
//         if (post.attachment) {
//             const filename = post.attachment.split("/images/")[1];
//             fs.unlink(`images/${filename}`, () => {
//                 Post.destroy({
//                     where: { id: post.id }
//                 }).then(() => res.status(200).json({
//                     message: 'Post supprimé!'
//                 })).catch(() => res.status(400).json({
//                     message: "Le post n'a pas été supprimé"
//                 }));
//             })
//         } else {
//             Post.destroy({
//                 where: { id: id }
//             }).then(() => res.status(200).json({
//                 message: 'Post supprimé!'
//             })).catch(() => res.status(400).json({
//                 message: "Le post n'a pas été supprimé"
//             }));
//         }
//     }).catch(() => res.status(500).json({ message: "Erreur serveur" }))
// };
exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id },
        // attributes: ['id', 'username', 'content', 'attachment'],
    }).then(() => res.status(200).json({
        message: 'Post supprimé!'
    })).catch(error => res.status(400).json({ error }))
};


exports.likePost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user;
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
            }).then(() => res.status(200).json({
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
            }).then(() => res.status(200).json({
                message: 'Like créé avec succés!'
            }))
        }
    })
        .catch(error => res.status(400).json({ error }));
};