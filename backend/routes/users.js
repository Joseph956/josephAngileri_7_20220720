const express = require('express');
const router = express.Router();
const multer = require('../middlware/multer-config');
const auth = require('../middlware/auth');
const usersCtrl = require("../controllers/users");
const adminCtrl = require("../controllers/users");

router.get("/", auth.token, usersCtrl.findAllPublished);
router.get("/:id", auth.token, usersCtrl.findOneProfil);
// auth.haveRightOnProfile,
router.post("/:id", auth.token, usersCtrl.publierProfil);
router.put("/:id/profile", auth.token, auth.haveRightOnProfile, multer, usersCtrl.updateProfil);
router.delete("/:id", auth.token, auth.haveRightOnProfile, multer, usersCtrl.deleteProfil);
// 
router.put("/:id/imgBottom", auth.token, auth.haveRightOnProfile, multer, usersCtrl.createImgBottom);
router.delete("/:id/imgBottom", auth.token, auth.haveRightOnProfile, multer, usersCtrl.deleteImgBottom);

//Les routes d'administrations du site.
// router.get('/admin', auth.token, adminCtrl.findAllPublished);
// router.get('/:id/admin', auth.token, adminCtrl.findOneProfil);
// router.delete('/:userId/admin', auth.token, multer, adminCtrl.deleteProfil);

// router.get('/search', auth.token,);
// router.post("/:id", auth.token, usersCtrl.publierProfil);

// // Modérateur: Modérer les interactions entre salariés.
// // Employés: Doivent pouvoir reperer facilement les derniers posts.
// // Accès à un forum de publication (textes).
// // Accès à un forum de publication (multimédias).
// //Organiser des tests de fonctionalités avec les salariés.

module.exports = router;