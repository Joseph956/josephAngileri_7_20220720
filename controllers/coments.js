const db = require("../models");
const Coment = db.coments;
const dotenv = require('dotenv');
dotenv.config();

//Lister tous les posts.
exports.findAllPublished = async (req, res) => {
    Coment.findAll({
        include: [
            {
                model: db.user,
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

//Créer un nouveau post.
exports.create = async (req, res, next) => {
    Post.sync({ alter: true }).then(() => {
        return Coment.create({
            coment: req.body.coment,
            include: [
                {
                    model: db.user,

                }
            ],

        });
    }).then((result) => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(400).json({ error, message: "l'utilisateur n'a pas été créé !!!" })
    });
};