const db = require("../models");
const User = db.user;
const Post = db.posts;
const Coment = db.coments;
const Like = db.likes;

exports.findAllLikes = async (req, res, next) => {
    Like.findAll({
        // where: {
        //     postId: req.params.postId,
        // },
        include: [{
            model: db.user,
            attributes: ['username']
        },
        {
            model: db.posts,
            attributes: ['id', 'post'],
            order: [["createdAt", "DESC"]]
        },
        {
            model: db.coments,
            attributes: ['id', 'coment'],
            order: [["createdAt", "DESC"]]
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
    console.log({ _id: req.params.id });
    console.log({ likes: req.body.like });
    console.log({ usersLiked: req.body.userId });
    const isLiked = req.body.like;
    console.log('---->isLiked');
    console.log(isLiked);

    if (isLiked.like === 1) {
        Post.updateOne({
            where: {
                _id: req.params.postId,
            }
        },
            {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId },
            }).then(() => res.status(201).json({ message: "un like est ajouté !" }
            )).catch((error) => res.status(400).json({ error })
            );
    } else if (isLiked.like === -1) {
        Post.updateOne({
            where: {
                _id: req.params.postIid
            }
        },
            {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
            }).then(() => res.status(201).json({ message: "un dislike est ajouté !" }
            )).catch((error) => res.status(400).json({ error })
            );
    } else {
        Post.findOne({
            where: {
                _id: req.params.postId
            },
        }).then((post) => {
            if (post.usersLiked.includes(req.body.userId)) {
                Post.updateOne({
                    where: {
                        _id: req.params.postId
                    }
                },
                    {
                        $pull: { usersLiked: req.body.userId },
                        $inc: { likes: -1 },
                    }).then(() => res.status(200).json({ message: "le like est supprimé !" }
                    )).catch((error) => res.status(400).json({ error })
                    );
            } else if (post.usersDisliked.includes(req.body.userId)) {
                Post.updateOne({
                    where: {
                        _id: req.params.postId
                    }
                },
                    {
                        $pull: { usersDisliked: req.body.userId },
                        $inc: { dislikes: -1 },
                    }).then(() =>
                        res.status(200).json({
                            message: "le dislike est supprimé !"
                        }
                        )).catch((error) => res.status(400).json({ error }));
            }
        }).catch((error) => res.status(500).json({ error: "erreur server" }));
    };
};