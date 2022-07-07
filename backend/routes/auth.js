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

router.post('/register', auth.email, auth.passwd, authCtrl.signUp);
router.post('/login', blocageRequete, authCtrl.signIn);
router.put('/logout', auth.token, authCtrl.logout);
router.put('/newPasswd/:id', auth.token, auth.haveRightOnProfile, auth.confirmPasswd, authCtrl.newPasswd);

module.exports = router;