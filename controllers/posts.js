const db = require("../models");
const Post = db.posts;
const Like = db.likes;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


//Lister tous les posts (ok).
exports.findAllPublished = async (req, res) => {
    Post.findAll({
        include: [
            {
                model: db.user,
                attributes: ['username']
            },
            {
                model: db.coments,
                coments: req.params.comentId,
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
                attributes: ['likes', 'dislikes'],
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
exports.findOne = (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

//Créer un nouveau post (ok).
exports.createPost = async (req, res, next) => {
    Post.create({
        userId: req.user,
        postId: req.post,
        content: req.body.content,
    }).then((post) => {
        console.log(post);
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le post n'a pas été créé !!!" })
    });
};

//Mettre à jour le post (ok).
exports.updatePost = (req, res, next) => {
    const postModify = req.file ? {
        ...req.body.postId,
        attachment: `${req.protocol}://${req.get("host")}/images${req.file.filename}`
    } : { ...req.body }
    Post.update({
        ...postModify, id: req.params.id
    }, {
        where: { id: req.params.id },
        attributes: ['id', 'content'],
    }).then((post) => res.status(200).json({
        message: "Le post a été modifié !"
    })).catch(() => res.status(400).json({
        message: "Le post n'a pas été modifié !"
    }))
};

//Supprimer un post (ok).
exports.deletePost = (req, res) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id }
    }).then(() => res.status(200).json({
        message: 'Post supprimé!'
    })).catch(error => res.status(400).json({ error }))
};

exports.likePost = async (req, res) => {
    console.log(req.params.id);
    console.log(req.user);
};

exports.unLikePost = async (req, res) => {

};
