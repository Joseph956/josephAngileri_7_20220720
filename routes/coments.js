const express = require('express');
const router = express.Router();

const comentsCtrl = require('../controllers/coments');

// //@route GET && POST - /posts/
router.get("/", comentsCtrl.findAllPublished);          //Lister tous les posts (admin).
// router.get("/:id", comentsCtrl.findOneById);            //Un utilisateur peut consulter sa fiche (admin).
router.post("/", comentsCtrl.create);            //Tous les utilisateurs.
// router.put("/:id", comentsCtrl.modifyPostById);         //Modification réservé au créateur du post.
// router.delete("/:id", comentsCtrl.deletePostById);      //Suppression réservé au créateur du post (admin).


module.exports = router;