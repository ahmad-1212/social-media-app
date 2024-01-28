const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const handleNotificationLogic = require("../utils/handleNotificationLogic");

// Create comment
exports.createComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const { postId } = req.params;
  const comment = await Comment.create({
    post: postId,
    user: req.user._id,
    content,
  });

  res.status(200).json({
    status: "success",
    comment,
  });

  handleNotificationLogic(postId, req.user, "comment");
});

// Get All Post Comments
exports.getPostComments = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { limit: reqLimit, page: reqPage } = req.query;
  const limit = reqLimit || 10;
  const page = reqPage || 1;

  const skip = (page - 1) * limit;
  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    length: comments.length,
    comments,
  });
});

// Delete a Comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);

  // if comment doesnot belong to a login user return an Error
  if (String(comment.user._id) !== String(req.user._id)) {
    return next(
      new AppError(
        "You cannot delete this comment, because it doesn't belongs to you",
        400
      )
    );
  }

  await Comment.findByIdAndDelete(commentId);

  res.status(204).json({
    status: "success",
    message: "comment deleted successfully",
  });
});
