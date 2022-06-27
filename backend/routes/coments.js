const express = require('express');
const router = express.Router();

const auth = require('../middlware/auth');
const comentCtrl = require('../controllers/coments');

router.get("/", auth.token, comentCtrl.findAllPublished);
router.get("/:id", auth.token, comentCtrl.findOnePublished);
router.get("/postId/:id", auth.token, comentCtrl.findCommentsByPostId);
router.post("/", auth.token, comentCtrl.createComent);
router.put("/:id", auth.token, auth.haveRightOnComent, comentCtrl.updateComent);
router.delete("/:id", auth.token, auth.haveRightOnComent, comentCtrl.deleteComent);

module.exports = router;