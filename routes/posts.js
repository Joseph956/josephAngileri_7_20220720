const express = require('express');
const router = express.Router();

// const auth = require('../middlware/auth');
// //const authPost = require('../middlware/valid');
// //const multer = require('../middlware/multer-config');
// //const authAdmin = require('../middlware/authAdmin');
const postsCtrl = require('../controllers/posts');

// //@route GET && POST - /posts/
router.get("/", postsCtrl.findAllPublished);          //Lister tous les posts (admin).
router.get("/:id", postsCtrl.findOneById);            //Un utilisateur peut consulter sa fiche (admin).
router.post("/", postsCtrl.create);            //Tous les utilisateurs.
router.put("/:id", postsCtrl.modifyPostById);         //Modification réservé au créateur du post.
router.delete("/:id", postsCtrl.deletePostById);      //Suppression réservé au créateur du post (admin).


// router.delete("/images/:id", postsCtrl.getOneImage); //Suppression réservé au créateur du post (admin).


// router.patch("/:id/like", postsCtrl.postLike);      //Suppression réservé au créateur du post (admin).
// router.post("/:id/likeUser", postsCtrl.likesByUser); //Suppression réservé au créateur du post (admin).
// router.post("/:id/like", postsCtrl.countLikes);      //Suppression réservé au créateur du post (admin).



module.exports = router;