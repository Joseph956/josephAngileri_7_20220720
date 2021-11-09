const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
// //const authPost = require('../middlware/authPost');
// const authComments = require('../middlware/authComments');
// const authAdmin = require('../middlware/authAdmin');
// //const multer = require('../middlware/multer-config');
const usersCtrl = require("../controllers/users")


router.get("/", usersCtrl.findAllPublished);       //Get - Lister tous les utilisateurs (admin).
router.get("/:id", usersCtrl.findOneById);         //Get - Afficher Un compte utilisateur (admin).
router.post("/NewFiche", usersCtrl.createNewUser); //Post - Créer un compte utilisateur
router.put("/:id", usersCtrl.modifyUserById);      //Put - Modifier/consulter un compte utilisateur
router.delete("/:id", usersCtrl.deleteUserById);   //Delete - Supprimer un compte utilisateur

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