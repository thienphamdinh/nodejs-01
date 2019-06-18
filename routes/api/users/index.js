const express = require("express");
const router = express.Router();

const userController = require("../users/users");
const { authenticating, authorizing } = require("../../../middlewear/auth");
const upload = require("../../../middlewear/upload-file");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get(
  "./test-private",
  authenticating,
  authorizing(["admin"]),
  userController.testPrivate
);

router.post(
  "/upload-avatar",
  authenticating,
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;
