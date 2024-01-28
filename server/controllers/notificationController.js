const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notificationModel");

const NOTIFICATION_LIMIT = 10;

// Get All User's notifications
exports.getUserNotifications = catchAsync(async (req, res, next) => {
  const { limit: reqLimit, page: reqPage } = req.query;

  const limit = reqLimit || NOTIFICATION_LIMIT;
  const page = reqPage || 1;

  const skip = (page - 1) * limit;
  const notifications = await Notification.find({
    toUser: req.user._id,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    length: notifications.length,
    notifications,
  });
});

// Read specific notification
exports.readNotification = catchAsync(async (req, res, next) => {
  const { notificationId } = req.params;
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    {
      read: true,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Notification readed successfully!",
    notification,
  });
});
