const db = require("../models");
const User = db.user;
const Posts = db.posts;
const Coment = db.coments;
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
        comentId: req.coment,
        coment: req.body.coment,
    }).then((coment) => {
        console.log(coment);
        res.status(201).json(coment)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le coment n'a pas été créé !!!" })
    });
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