const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const multer = require('../middlware/multer-config');
const postsCtrl = require('../controllers/posts');

router.get("/", auth.token, postsCtrl.findAllPublished);
router.get("/:id", auth.token, postsCtrl.findOnePublished);
router.post("/", auth.token, multer, postsCtrl.createPost);
router.put("/:id", auth.token, auth.haveRightOnPost, multer, postsCtrl.updatePost);
router.delete("/:id", auth.token, auth.haveRightOnPost, multer, postsCtrl.deletePost);

router.put("/:id/like/:userId", auth.token, postsCtrl.likePost);
router.put("/:id/unlike/:userId", auth.token, postsCtrl.unLikePost);
router.patch("/:id/like/:userId", auth.token, postsCtrl.likePost);
router.patch("/:id/unlike/:userId", auth.token, postsCtrl.unLikePost);

module.exports = router;