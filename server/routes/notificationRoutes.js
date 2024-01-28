const express = require("express");
const notificationController = require("../controllers/notificationController");
const protect = require("../middlewares/protect");

const router = express.Router();

router.use(protect);

router.patch("/:notificationId", notificationController.readNotification);
router.get(
  "/getUserNotifications",
  notificationController.getUserNotifications
);

module.exports = router;
