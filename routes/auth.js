const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const auth = require('../middlware/auth');


router.post('/registrer', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logout);

module.exports = router;