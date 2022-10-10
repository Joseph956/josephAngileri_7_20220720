const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const authCtrl = require('../controllers/auth');

//Les routes de création de compte/mot de passe, connexion/deconnexion des utilisateurs.
router.post('/register', auth.email, auth.passwd, authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.put('/logout', auth.token, authCtrl.logout);
router.put('/newPasswd/:id', auth.token, auth.haveRightOnProfile, auth.confirmPasswd, authCtrl.newPasswd);

module.exports = router;