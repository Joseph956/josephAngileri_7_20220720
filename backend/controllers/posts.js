const db = require("../models");
const Post = db.posts;
const Like = db.likes;
const fs = require('fs');
const dotenv = require('dotenv');
const post = require("../models/post");
dotenv.config();


//Lister tous les posts (ok).
exports.findAllPublished = async (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: db.user,
                attributes: ['username']
            },
            {
                model: db.coments,
                coment: req.params.comentId,
                attributes: ['id', 'coment'],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.user,
                        attributes: ['username']
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
exports.findOne = async (req, res, next) => {
    const id = req.params.id;
    Post.findOne({
        where: {
            id: id
        }
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

//Créer un nouveau post (ok).
exports.createPost = async (req, res, next) => {
    // if (!req.body.userId) {
    //     res.status(403).send({
    //         message: "Vous n'êtes pas autorisé à créer un post sur ce compte utlisateur !"
    //     });
    //     return
    // }
    Post.create({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        attachment: `${req.protocol}://${req.get("host")}/images/${req.file.image}`,
    }).then((post) => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le post n'a pas été créé !!!" })
    });
};

//Mettre à jour le post (ok).
exports.updatePost = async (req, res, next) => {
    console.log("----->ROUTE PUT : updatePost");
    const postModify = req.file ? {
        ...req.body.postId,
        attachment: `${req.protocol}://${req.get("host")}/images/post${req.file.filename}`
    } : { ...req.body }
    //Post.update({ userId: req.params.postId}, { where: { ...postModify, userId: req.params.postId}}) Atester
    Post.update({
        ...postModify, id: req.params.id
    }, {
        where: { id: req.params.id },
        attributes: ['id', 'username', 'content', 'attachment'],
    }).then((post) => res.status(200).json({
        post, message: "Le post a été modifié !"
    })).catch(() => res.status(400).json({
        message: "Le post n'a pas été modifié !"
    }))
};

//Supprimer un post (ok).
exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id }
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
