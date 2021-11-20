const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const authToken = require('../middlware/auth');
const authAdmin = require('../middlware/authAdmin');
// const authValid = require('../middlware/valid');
// const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

// //@route GET && POST - /posts/


//Lister tous les posts (tous les utilisateurs authentifiés).
router.get("/", authToken.token, postsCtrl.findAllPublished);

//Rechercher un post (tous les utilisateurs authentifiés).
router.get("/:id", postsCtrl.getPostById);
// authAdmin.postUser, authAdmin.isAdmin, auth,
//Création des posts (Tous les utilisateurs authentifiés).
router.post("/", authToken.token, postsCtrl.create);
// authAdmin.isAdmin, authAdmin.isUser, 

//Modification réservé au créateur du post et à l'admin.
router.put("/:id", authToken.token, postsCtrl.modifyPostById);
// authAdmin.isAdmin, authAdmin.isUser,
//Suppression réservé au créateur du post et à l'admin.
router.delete("/:id", authToken.token, authAdmin.isAdmin, authAdmin.postUser, postsCtrl.deletePostById);
// authAdmin,

//Suppression réservé au créateur du post (admin).
// router.delete("/images/:id", postsCtrl.getOneImage);

//Suppression réservé au créateur du post (admin).
// router.patch("/:id/like", postsCtrl.postLike);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/likeUser", postsCtrl.likesByUser);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/like", postsCtrl.countLikes);



module.exports = router;