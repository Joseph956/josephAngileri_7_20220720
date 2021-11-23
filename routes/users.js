const express = require('express');
const router = express.Router();

// const auth = require('../middlware/auth');
const authToken = require('../middlware/auth');
const authAdmin = require('../middlware/authAdmin');
// //const authPost = require('../middlware/authPost');
// const authComments = require('../middlware/authComments');
// //const multer = require('../middlware/multer-config');
const usersCtrl = require("../controllers/users")


//Lister tous les utilisateurs.
router.get("/", authToken.token, usersCtrl.findAllPublished);

//Accés au profil public utilisateur.
router.get("/:id", authToken.token, usersCtrl.findOneProfil);
// authAdmin.postUser,  authAdmin.isAdmin,

//Rechercher un utilisateur (user authentifier).
router.get('/search', authToken.token);

//Créer une nouvelle fiche utilisateur (admin).
router.post("/create", authToken.token, usersCtrl.createProfil);
//authAdmin.isAdmin,

//Picture : Modifier la photo du profil utilisateur.
// router.put("/:id", authAdmin.isAdmin, usersCtrl.update);

//profil : Modifier la description du profil utilisateur (user).
router.put("/:id", authToken.token, usersCtrl.updateProfil);
// authAdmin.postUser, authAdmin.isAdmin,

//Delete - Supprimer un compte utilisateur
router.delete("/:id", authToken.token, usersCtrl.deleteProfil);
// authAdmin.isAdmin, authAdmin.postUser,




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