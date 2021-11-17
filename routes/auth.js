const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const authIsAdmin = require('../middlware/authAdmin');
const authCtrl = require('../controllers/auth');

//s'enregistrer 
router.post('/register', authCtrl.signUp);

//Se connecter
router.post('/login', authCtrl.signIn);
// router.post('/login', authIsAdmin.isAdmin, authCtrl.signIn);

// Se déconnecter
router.get('/logout', authCtrl.logout);

//Modifier le mot de passe
router.put('/:id/password');

// Donner/enlever les droits admin.
router.put('/:id/admin');

//Confirmer l'authentification
router.get('/');


module.exports = router;