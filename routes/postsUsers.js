const express = require('express');
const router = express.Router();

//const auth = require('../middlware/auth');
//const authValid = require('../middlware/valid');
//const multer = require('../middlware/multer-config');
//const authIdentity = require('');
const postControllers = require('../controllers/postsUsers');

//@route GET && POST - /posts/
router.get("/", postControllers.getAllPosts);
router.get("/:id", postControllers.getPostById);
router.post("/NewPost", postControllers.createNewPost);
router.put("/:id", postControllers.modifyPostById);
router.delete("/:id", postControllers.deletePostById);

module.exports = router;