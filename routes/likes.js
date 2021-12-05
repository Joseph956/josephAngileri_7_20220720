const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const likesCtrl = require('../controllers/likes');
//contrôle et validation des données transmises(à créer).


//Lister tous les likes et dislikes d'une publication associer (post).
router.get('/', auth.token, likesCtrl.findAllLikes);

//noter la publication
router.put('/:id', auth.token, likesCtrl.createLikePost);

module.exports = router;