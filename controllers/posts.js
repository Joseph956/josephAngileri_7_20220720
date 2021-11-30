const db = require("../models");
const Post = db.posts;
const dotenv = require('dotenv');
const user = require("../models/user");
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
                attributes: ['id', 'coment'],
                order: [["createdAt", "DESC"]]

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

//Mettre à jour le post
exports.updatePost = (req, res, next) => {
    console.log("---->CONTENU: updatePost");
    console.log(updatePost);
    // res.send("Modifier l'image de l'utlisateur !!!");
    const postModifier = req.body.content;
    // const attachment = req.body.attachment;
    if (req.body.content) {
        Post.some({
            attributes: ['id', 'content'],
            where: { id: userId }
        }).then(post => {
            post.update({
                content: (postModifier ? postModifier : user.content),
                // attachment: (attachment ? attachment : user.attachment),
            }).then(() => res.status(201).json({
                message: "Le post a été modifié !"
            })).catch(() => res.status(400).json({
                message: "Le post n'a pas été modifié !"
            }))
        }).catch(error => res.status(500).json({ error }));
    } else {
        next();
    }
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

};

exports.unLikePost = async (req, res) => {

};
