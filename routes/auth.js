const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const authCtrl = require('../controllers/auth');

const rateLimit = require("express-rate-limit");
const blocageRequete = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, //Limite chaque IP a cinq requêtes par windowMs
    message: "Requetes abusives, vous devez attendre 5 min",
});

//S'enregistrer //Se connecter// Se déconnecter
router.post('/register', auth.email, auth.passwd, authCtrl.signUp);
router.post('/login', blocageRequete, authCtrl.signIn);
router.get('/logout', authCtrl.logout);

//accès au profil privé utilisateur (admin/user créateur).
// router.post('/:id/profil', authCtrl.signIn);

//Modifier le mot de passe
router.put('/:id/password');

// Donner/enlever les droits admin.
router.put('/:id/admin');

//Confirmer l'authentification
router.get('/');


module.exports = router;