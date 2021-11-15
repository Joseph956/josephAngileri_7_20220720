const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const likesCtrl = require('../controllers/likes');
//contrôle et validation des données transmises(à créer).

//noter la publication
router.post('/');

//Lister tous les likes et dislikes d'une publication associer (post).
router.get('/');

module.exports = router;