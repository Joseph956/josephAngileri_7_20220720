const express = require('express');
const router = express.Router();
// const upload = multer();
// const multer = require('../middlware/multer-config');
const auth = require('../middlware/auth');
const usersCtrl = require("../controllers/users");

router.get("/", auth.token, usersCtrl.findAllPublished);
router.get("/:id", auth.token, usersCtrl.findOneProfil);
router.post("/upload", auth.token, usersCtrl.upload);
router.put("/:id", auth.token, auth.haveRightOnProfile, usersCtrl.updateProfil);

router.delete("/:id", auth.token, auth.haveRightOnProfile, auth.haveRightOnPost, usersCtrl.deleteProfil);
router.get('/search', auth.token,);

//upload
// router.post('/upload', upload.single('file'), multer, uploadCtrl.uploadProfil);

//Picture : Modifier la photo du profil utilisateur.
// router.put("/:id", authAdmin.isAdmin, usersCtrl.update);



// //Get - Rechercher une fiche utlisateur (admin)
// //Get - Afficher tous les posts d'un utilisateur (admin).
// //Put - Modifier le mot de passe utilisateur (users / Admin).
// //Put - Modifier la photo du profil utilisateur (users).
// //Post - Création du compte administrateur (Lors de la 1 ère connexion à la base de données).


// // Modérateur: Modérer les interactions entre salariés.
// // Employés: Doivent pouvoir reperer facilement les derniers posts.
// // Accès à un forum de publication (textes).
// // Accès à un forum de publication (multimédias).

// //Organiser des tests de fonctionalités avec les salariés.


module.exports = router;