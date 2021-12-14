const db = require("../models");
const Coment = db.coments;
const Like = db.likes;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//Lister tous les coments(ok).
exports.findAllPublished = async (req, res) => {
    Coment.findAll({

        include: [
            {
                model: db.user,
                attributes: ['username']
            },
            {
                model: db.posts,
                postId: req.params.postId,
                attributes: ['id', 'content', 'attachment'],
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
    }).then(result => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des publications.",
        });
    });
};

exports.findOne = async (req, res, next) => {
    Coment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

//Créer un nouveau commentaire (ok).
exports.createComent = async (req, res, next) => {
    const comentPost = req.file ? {
        ...req.body.postId,
        attachment: `${req.protocol}://${req.get("host")}/images${req.file.filename}`
    } : { ...req.body }
    Coment.create({
        ...comentPost, id: req.params.id,
        userId: req.user,
        postId: req.body.postId,
        coment: req.body.coment,
    }).then((coment) => {
        console.log(coment);
        res.status(201).json(coment)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le coment n'a pas été créé !!!" })
    });
};

exports.updateComent = async (req, res, next) => {
    const comentModify = req.file ? {
        ...req.body.comentId,
        attachment: `${req.protocol}://${req.get("host")}/images${req.file.filename}`
    } : { ...req.body }
    Coment.update({
        ...comentModify, id: req.params.id
    }, {
        where: { id: req.params.id },
        attributes: ['coment', 'likes']
    }).then(() => res.status(200).json({
        message: "Le commentaire a été modifié !"
    })).catch(() => res.status(400).json({
        message: "Le comnentaire n'a pas été modifié !"
    }))
};

//Supprimer un commentaire.
exports.deleteComent = (req, res) => {
    const id = req.params.id;
    Coment.destroy({
        where: { id: id }
    }).then(() => res.status(200).json({
        message: 'Coment supprimé!'
    })).catch(error => res.status(400).json({ error }))
};

exports.likeComent = async (req, res, next) => {
    const comentId = req.params.id;
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
                likes: 1
            }, {
                where: { id: likeFound.id },
            }).then(() => res.status(200).json({
                message: 'Like modifié avec succés!'
            }))
        } else {
            Like.create({
                userId: userId,
                comentId: comentId,
                likes: 1
            }).then(() => res.status(200).json({
                message: 'Like créé avec succés!'
            }))
        }
    })
        .catch(error => res.status(400).json({ error }));
};

exports.unLikeComent = async (req, res, next) => {
    const comentId = req.params.id;
    const userId = req.user;
    Like.findOne({
        where: {
            userId: userId,
            comentId: comentId
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
                comentId: comentId,
                likes: -1
            }).then(() => res.status(200).json({
                message: 'Like créé avec succés!'
            }))
        }
    })
        .catch(error => res.status(400).json({ error }));
};