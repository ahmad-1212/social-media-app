const Like = require("../models/likeModel");
const catchAsync = require("../utils/catchAsync");
const handleNotificationLogic = require("../utils/handleNotificationLogic");

// Add like to a post
exports.addLike = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const like = await Like.create({
    post: postId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    message: "like added",
    like,
  });
  handleNotificationLogic(postId, req.user, "like");
});

// Remove like from post
exports.removeLike = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  await Like.findOneAndDelete({
    post: postId,
    user: req.user._id,
  });

  res.status(204).json({
    status: "success",
    message: "Like removed successfully!",
  });
});

// Get all the Users likes
exports.getAllCurrentUserLikes = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const likes = await Like.find({
    user: userId,
  });

  res.status(200).json({
    status: "success",
    likes,
  });
});
