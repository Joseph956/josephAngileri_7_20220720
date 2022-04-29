const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

router.get("/", auth.token, postsCtrl.findAllPublished);
router.get("/:id", auth.token, postsCtrl.findOnePublished);
router.post("/", auth.token, multer, postsCtrl.createPost);
router.put("/:id", auth.token, auth.haveRightOnPost, multer, postsCtrl.updatePost);
router.put("/:id/like", auth.token, postsCtrl.likePost);
router.put("/:id/unlike", auth.token, postsCtrl.unLikePost);
router.delete("/:id", auth.token, auth.haveRightOnPost, multer, postsCtrl.deletePost);



//Suppression image réservé au créateur du post (admin).
// router.delete("/images/:id", postsCtrl.getOneImage);

//Suppression like réservé au créateur du post (admin).
// router.patch("/:id/like", postsCtrl.postLike);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/likeUser", postsCtrl.likesByUser);

//Suppression réservé au créateur du post (admin).
// router.post("/:id/like", postsCtrl.countLikes);



module.exports = router;