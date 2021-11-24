const db = require("../models");
const Post = db.posts;
const User = db.user;
const dotenv = require('dotenv');
dotenv.config();


//Lister tous les posts (ok).
exports.findAllPublished = async (req, res) => {
    Post.findAll({
        include: [
            {
                model: db.user,
            }
        ],
        order: [["createdAt", "DESC"]],
    }).then(post => {
        res.status(200).json(post);
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
        content: req.body.content,
        userId: req.user,

    }).then((post) => {
        console.log(post);
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le post n'a pas été créé !!!" })
    });
};

//Supprimer un post (ok).
exports.deletePost = (req, res) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id }
    })
        .then(() => res.status(200).json({ message: 'Post supprimé!' }))
        .catch(error => res.status(400).json({ error }))
};
