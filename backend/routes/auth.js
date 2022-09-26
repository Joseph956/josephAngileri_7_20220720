const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const authCtrl = require('../controllers/auth');
const rateLimit = require("express-rate-limit");
const blocageRequete = rateLimit({

    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, //Limite chaque IP a cinq requêtes par windowMs
    standardHeaders: true, // Return rate limit info dans les en-têtes `RateLimit-*` 
    legacyHeaders: false,  // Désactive les en-têtes `X-RateLimit-*` 
    // message: 'Requetes abusives, vous devez attendre 5 min',
    message:
        `<h1 style='display:flex; align-items:center; justify-content:center; height:100vh'>
     429 - Too many Requests <br> 'Requetes abusives, vous devez attendre 5 min'!
    </h1>`,
});

//Les routes de création de compte/mot de passe, connexion/deconnexion des utilisateurs.
router.post('/register', auth.email, auth.passwd, authCtrl.signUp);
router.post('/login', blocageRequete, authCtrl.signIn);
router.put('/logout', auth.token, authCtrl.logout);
router.put('/newPasswd/:id', auth.token, auth.haveRightOnProfile, auth.confirmPasswd, authCtrl.newPasswd);

module.exports = router;