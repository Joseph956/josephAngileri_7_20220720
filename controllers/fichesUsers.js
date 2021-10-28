const modelFiche = require("../models/User");

exports.getAllFiches = (req, res, next) => {

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