const db = require("../models");
const Post = db.posts;
const Coment = db.coments;
const Like = db.likes;

exports.findAllLikes = async (req, res, next) => {
    Post.findAll({
        include: [{
            model: db.likes,
            likes: req.params.likeId,
            attributes: ['likes', 'dislikes'],
            order: [["created", "DESC"]]
        }],
    }).then(likePostFound => {
        if (likePostFound) {
            res.status(200).json(likePostFound);
        } else {
            res.status(404).json({ error: "Aucun like n'a été trouvé !" });
        }
    }).catch(error => res.status(500).json({ error }));
};

//Créer un nouveau like.
//Créer like/dislike post
//Créer like/dislike coment
exports.createLikePost = async (req, res, next) => {
    try {
        console.log({ id: req.params.id });
        console.log({ likes: req.body.like });
        console.log({ usersLiked: req.body.userId });
        const id = req.params.id;
        const newLike = req.body.newLike;
        console.log("---->CONTENU: newLike");
        console.log(newLike);
        if (newLike.like === 1) {
            Like.update({
                where: {
                    id: id,
                },
                include: [{
                    model: db.likes,
                }],
            }, {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId },
            }).then(likeFound => {
                if (likeFound === 1) {
                    res.status(200).json(likeFound);
                } else {
                    res.status(404).json({ error: "Aucun like n'a été trouvé !" });
                }
            }).catch(error => res.status(500).json(error));
        } else if (newLike === -1) {
            Post.update({
                _id: req.params.id
            }, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
            }).then(() => res.status(201).json({ message: "un dislike est ajouté !" }
            )).catch((error) => res.status(400).json({ error }));
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};

exports.modifyLikePost = async (req, res, next) => {
    res.send("Modifier un like");
};