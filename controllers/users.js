const db = require("../models");
const User = db.user;
const Role = db.role;

//Lister tous les utilisateurs.
exports.findAllPublished = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        return User.findAll({
            user: (req.body.user),
            order: [["createdAt", "DESC"]],
        });
    }).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des fiches utilisateurs.",
        });
    });
};

//Appeler un profil utilisateur par son id (ok).
exports.findOneProfil = (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

//Créer un nouveau profil utilisateur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const User = {
        username: req.body.username,
        // attachment: req.body.attachment,
        email: req.body.email ? req.body.email : false
    };

    // Save user in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

exports.createProfil = (req, res, next) => {
    User.sync({ alter: true }).then(() => {
        if (!req.body.user) {
            res.status(400).send({
                message: "Tous les champs sont requis!"
            });
            return;
        };
        // const user = {
        //     // id: user.id,
        //     // attachment: user.attachment,
        //     username: user.username,
        //     email: req.body.email,
        //     password: req.body.password,
        //     // bio: user.bio,
        //     // isAdmin: user.isAdmin
        // };
        User.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est lors de la création du profil utilisateur!"
                })
            });
    });



    res.send('Créer une nouvelle fiche utlisateur !!!');
};

//Modifier un profil utilisateur.
exports.updateProfil = (req, res) => {

    // try {
    //     const { userId } = req.params;
    //     const [updated] = await User.update(req.body, {
    //         where: { id: userId }
    //     });
    //     if (updated) {
    //         const updatedUser = await User.findOne({ where: { id: userId } });
    //         return res.status(200).json({ user: updatedUser });
    //     }
    //     throw new Error('User not found');
    // } catch (error) {
    //     return res.status(500).send(error.message);
    // }


    const { userId } = req.params;

    User.update({
        where: { id: userId }

    }).then(() => res.status(200).json({
        message: 'Profil utilisateur mis a jour!'
    }))
        .catch(error => res.status(400).json({ error }))
};


//Supprimer un profil (ok)
exports.deleteProfil = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Le profil a été supprimé avec succès!"
                });
            } else {
                res.status(400).send({
                    message: `Impossible de supprimer le profil id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ err });
        });
};
