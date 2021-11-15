const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const authAdmin = require('../middlware/authAdmin');
// const authValid = require('../middlware/valid');
// const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

// //@route GET && POST - /posts/


//Lister tous les posts (admin).
router.get("/", postsCtrl.findAllPublished);

//Lister un seul post.
router.get("/:id", postsCtrl.findOneById);

//Création des posts (Tous les utilisateurs).
router.post("/", postsCtrl.create);

//Modification réservé au créateur du post.
router.put("/:id", postsCtrl.modifyPostById);

//Suppression réservé au créateur du post (admin).
router.delete("/:id", postsCtrl.deletePostById);


//Suppression réservé au créateur du post (admin).
// router.delete("/images/:id", postsCtrl.getOneImage);

//Suppression réservé au créateur du post (admin).
// router.patch("/:id/like", postsCtrl.postLike);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/likeUser", postsCtrl.likesByUser);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/like", postsCtrl.countLikes);



module.exports = router;