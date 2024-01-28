const { uploadImage, deleteImage } = require("../cloudinary");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Notification = require("../models/notificationModel");

const POSTS_LIMIT = 10;

// Get posts
exports.getPosts = catchAsync(async (req, res, next) => {
  const { limit: reqLimit, page: reqPage, profileId } = req.query;
  const limit = reqLimit || POSTS_LIMIT;
  const page = reqPage || 1;
  const skip = (page - 1) * limit;

  let posts;
  if (!profileId || profileId === "null") {
    posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  } else {
    posts = await Post.find({ creator: profileId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  res.status(200).json({
    status: "success",
    length: posts.length,
    posts,
  });
});

// Create Post
exports.createPost = catchAsync(async (req, res, next) => {
  const result = await uploadImage(req, next);
  // Create Post with all the data in Body

  if (!result) return next(new AppError("Please provide an Image", 400));
  const newPost = await Post.create({
    creator: req.user._id,
    description: req.body.description,
    image: result.url,
    imageId: result.public_id,
  });

  res.status(201).json({
    status: "success",
    post: newPost,
  });
});

// Delete a Post with ID
exports.deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  // If no post found with id  return an error
  if (!post) return next(new AppError("No post found with ID", 404));

  // If post is not creater by the login user return an error
  if (String(post.creator._id) !== String(req.user._id))
    return next(new AppError("You cannot delete this post!"));

  // Delete all likes comments & image of post then delete the post
  await Like.deleteMany({ post: postId });
  await Comment.deleteMany({ post: postId });
  await Notification.deleteMany({ post: postId });
  await deleteImage(post.imageId);
  await Post.findByIdAndDelete(postId);

  res.status(204).json({
    status: "success",
    message: "Post deleted successfully!",
  });
});
