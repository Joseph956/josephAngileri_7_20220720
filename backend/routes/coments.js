const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const multer = require('../middlware/multer-config');
const comentCtrl = require('../controllers/coments');

router.get("/", auth.token, comentCtrl.findAllPublished);
router.get("/", auth.token, comentCtrl.findOne);
router.post("/", auth.token, comentCtrl.createComent);
router.put("/:id", auth.token, auth.haveRightOnComent, comentCtrl.updateComent);
router.put("/:id/like", auth.token, comentCtrl.likeComent);
router.put("/:id/unlike", auth.token, comentCtrl.likeComent);
router.delete("/:id", auth.token, auth.haveRightOnComent, comentCtrl.deleteComent);

module.exports = router;