const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');


// //const authPost = require('../middlware/authPost');
// const authComments = require('../middlware/authComments');
// //const multer = require('../middlware/multer-config');
const usersCtrl = require("../controllers/users")


//Lister tous les utilisateurs.
router.get("/", auth.token, usersCtrl.findAllPublished);

//Accés au profil public utilisateur.
router.get("/:id", auth.token, usersCtrl.findOneProfil);
// authAdmin.postUser,  authAdmin.isAdmin,

//Rechercher un utilisateur (user authentifier).
router.get('/search', auth.token,);

//Créer une nouvelle fiche utilisateur (admin).
router.post("/create", auth.token, usersCtrl.createProfil);
//authAdmin.isAdmin,

//Picture : Modifier la photo du profil utilisateur.
// router.put("/:id", authAdmin.isAdmin, usersCtrl.update);

//profil : Modifier la description du profil utilisateur (user).
router.put("/:id", auth.token, auth.haveRightOnProfile, usersCtrl.updateProfil);
// authAdmin.postUser, authAdmin.isAdmin,

//Delete - Supprimer un compte utilisateur
router.delete("/:id", auth.token, auth.haveRightOnProfile, auth.haveRightOnPost, usersCtrl.deleteProfil);
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