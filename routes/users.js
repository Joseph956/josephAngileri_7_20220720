const express = require('express');
const router = express.Router();

// //const auth = require('../middlware/auth');
// //const authValid = require('../middlware/valid');
// //const multer = require('../middlware/multer-config');
// //const authIdentity = require('');
const ficheControllers = require("../controllers/usersControllers")

router.get("/", ficheControllers.getUsersList);            //Get - Toutes les fiches utilisateurs
router.get("/:id", ficheControllers.getFicheById);         //Get - Une seule fiche utilisateur
router.post("/NewFiche", ficheControllers.createNewFiche); //Post - Créer un compte utilisateur
router.put("/:id", ficheControllers.modifyFicheById);      //Put - Modifier une fiche utilisateur
router.delete("/:id", ficheControllers.deleteFicheById);   //Delete - Supprimer une fiche utilisateur

// //Get - Rechercher une fiche utlisateur
// //Get - Afficher tous les posts d'un utilisateur.
// //Put - Modifier le mot de passe utilisateur.
// //Put - Modifier la photo du profil utilisateur.
// //Post - Création du compte administrateur.
// //Put - Modification du compte administrateur.
// //Delete - Supression d'un compte utlisateur.

// // Modérateur: Modérer les interactions entre salariés.
// // Employés: Doivent pouvoir reperer facilement les derniers posts.
// // Accès à un forum de publication (textes).
// // Accès à un forum de publication (multimédias).

// //Organiser des tests de fonctionalités avec les salariés.


module.exports = router;