const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const protect = require("../middlewares/protect");

const multerUpload = require("../middlewares/multerUpload");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(protect);

router.post(
  "/updateUserData",
  multerUpload.single("userImage"),
  userController.updateUserData
);

router.post("/updatePassword", userController.updateUserPassword);

router.get("/getCurrentUser", userController.getCurrentUser);
router.get("/getUser/:userId", userController.getUser);
router.patch("/readUserNotification", userController.readUserNotification);
router.post(
  "/updateCoverPhoto",
  multerUpload.single("coverPhoto"),
  userController.updateCoverPhoto
);
router.post("/:userId/follow", userController.follow);
router.post("/:userId/unFollow", userController.unFollow);
router.get("/suggestedUsers", userController.getSuggestedUsers);

module.exports = router;
