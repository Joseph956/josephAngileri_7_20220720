const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const likesCtrl = require('../controllers/likes');

//Lister tous les likes et dislikes d'une publication associer (post).
router.get('/', auth.token, likesCtrl.findAllLikes);
//noter la publication
router.post('/', auth.token, likesCtrl.createLikePost);
router.put('/:id', auth.token, likesCtrl.modifyLikePost);

module.exports = router;