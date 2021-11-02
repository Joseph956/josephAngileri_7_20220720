const userModel = require('../models/users_table');

exports.getUsersList = (req, res, next) => {
    // userModel.getAllUsers((err, users) => {
    //     console.log('Nous sommes embauchés');
    //     if (err)
    //         res.send(err);
    //     console.log('users', users);
    //     res.send(users, 'Vous ne pouvez pas voir les fiches utilisateurs !!!');
    // })
    res.send('Afficher toutes les fiches utilisateurs !!!');
};

exports.getFicheById = (req, res, next) => {

    res.send('Afficher une fiche utilisateur par son id !!!');
};


exports.createNewFiche = (req, res, next) => {

    res.send('Créer une nouvelle fiche utlisateur !!!');
};

exports.modifyFicheById = (req, res, next) => {

    res.send('Modifier la fiche utilisateur !!!');
};

exports.deleteFicheById = (req, res, next) => {

    res.send('Supprimer la fiche utilisateur !!!');
};