const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const comentsCtrl = require('../controllers/coments');
//contrôle et validation des données transmises(à créer).
//Contrôle et validation de l'identité de l'utlisateur(à créer).

// //@route GET && POST - /Coments/

//Lister tous les commentaires associés à un post (admin).
router.get("/", comentsCtrl.findAllPublished);

//Créer un nouveau commentaire (Tous les utilisateurs).
router.post("/", comentsCtrl.createComent);

//Suppression d'un commentaire réservé au créateur du post (credential)&(admin).
router.delete("/:id", comentsCtrl.deleteComent);


module.exports = router;