const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const postsCtrl = require('../controllers/posts');
// const multer = require('../middlware/multer-config');

router.get("/", auth.token, postsCtrl.findAllPublished);
router.get("/:id", auth.token, postsCtrl.findOne);
router.post("/", auth.token, postsCtrl.createPost);
router.put("/:id", auth.token, auth.haveRightOnPost, postsCtrl.updatePost);
router.delete("/:id", auth.token, auth.haveRightOnPost, postsCtrl.deletePost);
router.put("/:id/like", auth.token, postsCtrl.likePost);
router.put("/:id/unlike", auth.token, postsCtrl.unLikePost);

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