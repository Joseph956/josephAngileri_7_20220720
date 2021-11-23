const db = require("../models");
const Coment = db.coments;
const User = db.user;
const dotenv = require('dotenv');
dotenv.config();

//Lister tous les coments(ok).
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

//Créer un nouveau commentaire (ok).
exports.createComent = async (req, res, next) => {
    Coment.create({
        coment: req.body.coment,
        userId: User._id,
    }).then((post) => {
        console.log(post);
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le coment n'a pas été créé !!!" })
    });
};

//Supprimer un commentaire(ok).
exports.deleteComent = (req, res) => {
    const id = req.params.id;
    console.log('--->CONTENU: id');
    console.log(id);

    Coment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le commentaire a été supprimé avec succés!"
                });
            } else {
                res.status(400).send({
                    message: `Impossible de supprimer le commentaire id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                err,
                message: "Impossible de supprimer le post avec cet id=" + id
            });
        });
};