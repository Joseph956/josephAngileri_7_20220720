const express = require('express');
const router = express.Router();
const Joi = require('joi');

const auth = require('../middlware/auth');
const comentCtrl = require('../controllers/coments');
// const valid = require('../middlware/controlInputs');
//contrôle et validation des données transmises(à créer).

// //@route GET && POST - /Coments/

//Lister tous les commentaires associés à un post (admin).
router.get("/", auth.token, comentCtrl.findAllPublished);

//Publier un nouveau commentaire (Tous les utilisateurs).
router.post("/", auth.token, comentCtrl.createComent);
//valid.comentContent,
//Suppression d'un commentaire réservé au créateur du post (credential)&(admin).
router.delete("/:id", auth.token, auth.haveRightOnComent, comentCtrl.deleteComent);


module.exports = router;