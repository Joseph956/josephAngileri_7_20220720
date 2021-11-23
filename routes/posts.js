const express = require('express');
const router = express.Router();

const authToken = require('../middlware/auth');
const authAdmin = require('../middlware/authAdmin');
// const authValid = require('../middlware/valid');
// const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

// //@route GET && POST - /posts/

//Lister tous les posts (tous les utilisateurs authentifiés).
router.get("/", authToken.token, postsCtrl.findAllPublished);

//Rechercher un post (tous les utilisateurs authentifiés).
router.get("/:id", authToken.token, postsCtrl.findOne);
// authAdmin.postUser, authAdmin.isAdmin, 

//Création des posts (Tous les utilisateurs authentifiés).
router.post("/", authToken.token, postsCtrl.createPost);
// authAdmin.isAdmin, authAdmin.isUser, 

//Suppression réservé au créateur du post et à l'admin.
router.delete("/:id", authToken.token, postsCtrl.deletePost);
// authAdmin.isAdmin, authAdmin.postUser, 

//Suppression image réservé au créateur du post (admin).
// router.delete("/images/:id", postsCtrl.getOneImage);

//Suppression like réservé au créateur du post (admin).
// router.patch("/:id/like", postsCtrl.postLike);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/likeUser", postsCtrl.likesByUser);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/like", postsCtrl.countLikes);



module.exports = router;