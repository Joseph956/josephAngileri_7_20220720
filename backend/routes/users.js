const express = require('express');
const router = express.Router();
const multer = require('../middlware/multer-config');
const auth = require('../middlware/auth');
const usersCtrl = require("../controllers/users");

router.get("/", auth.token, usersCtrl.findAllPublished);
router.get("/:id", auth.token, usersCtrl.findOneProfil);
router.get("/:id/publishProfil", auth.token, usersCtrl.publierProfil);
router.put("/:id/profile", auth.token, auth.haveRightOnProfile, multer, usersCtrl.updateProfil);
router.delete("/:id", auth.token, auth.haveRightOnProfile, multer, usersCtrl.deleteProfil);
router.put("/:id/imgBottom", auth.token, auth.haveRightOnProfile, multer, usersCtrl.createImgBottom);
router.delete("/:id/imgBottom", auth.token, auth.haveRightOnProfile, multer, usersCtrl.deleteImgBottom);

module.exports = router;