const db = require("../models");
const Coment = db.coments;

//Lister tous les posts.
exports.findAllPublished = async (req, res) => {
    Coment.findAll({
        include: [
            {
                model: db.user,
            }
        ],
        order: [["createdAt", "DESC"]],
    }).then(coment => {
        res.status(200).json(coment);
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
            post: req.body.post
        });
    }).then(() => {
        res.status(201).json(Coment)
    }).catch(error => {
        res.status(400).json({ error, message: "l'utilisateur n'a pas été créé !!!" })
    });
};