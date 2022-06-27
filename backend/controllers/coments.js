const db = require("../models");
const Coment = db.coments;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

exports.findAllPublished = async (req, res) => {

    Coment.findAll({

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
        ]
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};
//Permet l'affichage des commentaires associer à un post
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
        ]

    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};
exports.createComent = async (req, res, next) => {
    const coment = new Coment({
        ...req.body,
    })
    coment.save().then(() => {
        console.log(coment);
        res.status(201).json({ message: 'Objet enregistré !' })
    }).catch((error) => {
        res.status(400).json({ error, message: "Le commentaire n'a pas été créé !!!" })
    });
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
    }).then(() => res.status(200).json({
        message: "Le commentaire a été modifié !"
    })).catch(() => res.status(400).json({
        message: "Le comnentaire n'a pas été modifié !"
    }))
};
exports.deleteComent = (req, res) => {
    const id = req.params.id;
    Coment.destroy({
        where: { id: id }
    }).then(() => res.status(200).json({
        message: 'Coment supprimé!'
    })).catch(error => res.status(400).json({ error }))
};
