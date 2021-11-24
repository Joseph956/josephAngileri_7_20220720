const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
// const validate = require('../middlware/validate');
// const authValid = require('../middlware/valid');
// const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

// //@route GET && POST - /posts/

//Lister tous les posts (tous les utilisateurs authentifiés).
router.get("/", auth.token, postsCtrl.findAllPublished);

//Rechercher un post (tous les utilisateurs authentifiés).
router.get("/:id", auth.token, postsCtrl.findOne);
// authAdmin.postUser, authAdmin.isAdmin, 

//Création des posts (Tous les utilisateurs authentifiés).
router.post("/", auth.token, postsCtrl.createPost);
// authAdmin.isAdmin, authAdmin.isUser, 

//Suppression réservé au créateur du post et à l'admin.
router.delete("/:id", auth.token, auth.haveRightOnPost, postsCtrl.deletePost);

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