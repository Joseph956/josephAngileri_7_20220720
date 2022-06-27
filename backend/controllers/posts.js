const db = require("../models");
const Post = db.posts;
const Like = db.likes;
const UnLike = db.unlikes;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

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
        },
        {
            model: db.unlikes,
            likes: req.params.likeId,
            attributes: ['unlikes'],
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
exports.likePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user;
        const likeFound = await
            Like.findOne({
                where: {
                    userId: userId,
                    postId: postId,
                },
                include: [
                    {
                        model: db.user,
                        attributes: ['username']
                    },
                ],
            })
        if (likeFound) {
            await likeFound.destroy()
            res.status(200).json({ like: false })
        } else {
            Like.create({
                userId: userId,
                postId: postId,
                likes: 1
            }).then(() => res.status(201).json({
                message: 'Like créé avec succés!'
            })).catch(error => res.status(400).json({ error, message: "Le like n'a pas été créé !!!" }));
        }
    } catch (error) {
        res.status(500).json({ error })
    }


};
exports.unLikePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user;
        const unLikeFound = await
            UnLike.findOne({
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
            })
        if (unLikeFound) {
            await unLikeFound.destroy()
            res.status(200).json({ like: false })
        } else {
            UnLike.create({
                userId: userId,
                postId: postId,
                unlikes: -1
            }).then(() => res.status(201).json({
                message: 'Dislike créé avec succés!'
            })).catch(error => res.status(400).json({ error, message: "Le dislike n'a pas été créé !!!" }));
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};