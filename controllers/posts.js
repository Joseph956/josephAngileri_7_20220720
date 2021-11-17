const db = require("../models");
const Post = db.posts;
const dotenv = require('dotenv');
dotenv.config();


//Lister tous les posts.
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

//Récupérer un seul post.
exports.findOneById = (req, res, next) => {
    Post.sync({ alter: true }).then(() => {
        return Post.findOne({
            where: { id: req.body.postId },
            attributes: [['id', 'postId']],
            include: [
                {
                    model: db.user,
                }
            ],
            post: req.params.id
        });
    }).then((result) => {
        res.status(200).json(result);
        console.log(result);
    }).catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};


//Créer un nouveau post.
exports.create = async (req, res, next) => {
    Post.sync({ alter: true }).then(() => {
        return Post.create({

            include: [
                {
                    model: db.user,
                }
            ],
            content: req.body.content
        });
    }).then((post) => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error: "Le post n'a pas été créé !!!" })
    });
};

//Modifier un post.
exports.modifyPostById = async (req, res, next) => {
    Post.sync({ alter: true }).then(() => {
        return Post.update({
            where: { id: postId },
            include: [
                {
                    model: db.user,
                }
            ],
            content: req.body.content
        });
    }).then((post) => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error: "Le post n'a pas été modifié !!!" })
    });
    // res.send('Modifier un post utilisateur par son id !!!');
};

// Supprimer un post.
exports.deletePostById = async (req, res, next) => {

    res.send('Supprimer un post utilisateur par son id !!!');
};