const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const authCtrl = require('../controllers/auth');
// const adminCtrl = require('../controllers/auth');

const rateLimit = require("express-rate-limit");
const blocageRequete = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, //Limite chaque IP a cinq requêtes par windowMs
    message: "Requetes abusives, vous devez attendre 5 min",
});

//Les routes de création, connexion, et deconnexion des utilisateurs.
router.post('/register', auth.email, auth.passwd, authCtrl.signUp);
router.post('/login', blocageRequete, authCtrl.signIn);
router.put('/logout', auth.token, authCtrl.logout);

//La route de gestion des mots de passe utlisateurs.
router.put('/newPasswd/:id', auth.token, auth.haveRightOnProfile, auth.confirmPasswd, authCtrl.newPasswd);

//Les routes d'administrations du site.
// router.put('/newPasswd/:id/admin', auth.token, adminCtrl.confirmPasswd, authCtrl.newPasswd);
module.exports = router;