const db = require("../models");
const Coment = db.coments;
const dotenv = require('dotenv');
dotenv.config();

exports.findAllPublished = async (req, res) => {
    Coment.findAll({
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment'],
                order: [['createdAt', 'DESC']],
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
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
                            },
                        ]
                    },
                    {
                        model: db.likes,
                        likes: req.body.likeId,
                        attributes: ['likes'],
                        order: [["createdAt", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            }
                        ],
                    },
                ],
            },
        ],
        order: [['createdAt', 'DESC']],
        attributes: {
            exclude: ['updateAt']
        }
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
exports.findOnePublished = async (req, res, next) => {
    const comentId = req.params.id;
    Coment.findOne({
        where: {
            id: comentId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
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
                            },
                        ]
                    },
                    {
                        model: db.likes,
                        likes: req.body.likeId,
                        attributes: ['likes'],
                        order: [["created", "DESC"]],
                        include: [
                            {
                                model: db.user,
                                attributes: ['username', 'attachment']
                            }
                        ],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    }).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(400).json({ error });
    });
};
exports.findCommentsByPostId = async (req, res, next) => {
    const postId = req.params.id;
    Coment.findAll({
        where: {
            postId: postId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
            {
                model: db.posts,
                post: req.params.postId,
                attributes: ['id', 'content', 'userId'],
                order: [["createdAt", "DESC"]],
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
                            },
                        ]
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    }).then(user => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json({
            message:
                error.message ||
                "Une erreur s'est produite lors de la récupération des commentaires de la publication !",
        });
    });
};
exports.createComent = async (req, res, next) => {    
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    try {
        const coment = new Coment({
            ...req.body,
        });
            await coment.save({
                include: [
                    {
                        model: db.user,
                        attributes: ['username', 'attachment']
                    },
                ]
            });            
        res.status(201).json({
            message: 'Objet enregistré !'
            });
        next( req, res );

    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "An error occurred while saving the comment" });
    }
};
exports.updateComent = async (req, res, next) => {
    const comentId = req.params.id;
    Coment.findOne({
        where: {
            id: comentId
        },
        include: [
            {
                model: db.user,
                attributes: ['username', 'attachment']
            },
        ]
    })
    const comentModify = req.file ? {
        ...req.body.comentId,
    } : { ...req.body }
    Coment.update({
        ...comentModify, id: req.params.id
    }, {
        where: { id: req.params.id },
        attributes: ['coment']
    }).then(() => {
        res.status(200).json({
            message: "Le commentaire a été modifié !"
        });
    }).catch((error) => {
        res.status(400).json({
            error, message: "Le comnentaire n'a pas été modifié !"
        });
    });
};
exports.deleteComent = (req, res) => {
    const id = req.params.id;
    Coment.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: 'Commentaire supprimé!'
        });
    }).catch((error) => {
        res.status(400).json({
            error, message: "Vous ne pouvez pas supprimer un commentaire dont vous n'êtes pas l'auteur !!!"
        });
    });
};
