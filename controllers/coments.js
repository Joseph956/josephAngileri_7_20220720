const db = require("../models");
const Coment = db.coments;
const Like = db.likes;
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
                attributes: ['id', 'content'],
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

//Créer un nouveau commentaire (ok).
exports.createComent = async (req, res, next) => {
    Coment.create({
        userId: req.user,
        postId: req.post,
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