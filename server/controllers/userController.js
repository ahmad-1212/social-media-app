const { uploadImage, deleteImage } = require("../cloudinary");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get User function
exports.getCurrentUser = catchAsync(async (req, res, next) => {
  req.user.password = undefined;
  res.status(200).json({
    status: "success",
    authenticated: true,
    user: req.user,
  });
});

// Get User with id
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId)
    .populate({
      path: "following",
      select: "name email photo",
    })
    .populate({
      path: "followers",
      select: "name photo email",
    });

  if (user.password) user.password = undefined;

  res.status(200).json({
    status: "success",
    user,
  });
});

// Read User Notification
exports.readUserNotification = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { notification: false },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    user,
  });
});

// Update user cover photo
exports.updateCoverPhoto = catchAsync(async (req, res, next) => {
  const result = await uploadImage(req, next);

  // If there is no image return an error
  if (!result) return next(new AppError("Please provide an image", 400));

  // If image than get user
  const user = await User.findById(req.user._id)
    .populate({
      path: "following",
      select: "name email photo",
    })
    .populate({
      path: "followers",
      select: "name photo email",
    });

  // Get old photo id
  const oldCoverPhotoId = user.coverPhotoId;

  // Delete old photo with id if exists
  if (oldCoverPhotoId) await deleteImage(oldCoverPhotoId);

  // Update user cover photo and id
  user.coverPhoto = result.url;
  user.coverPhotoId = result.public_id;
  await user.save({ validateBeforeSave: false });

  // Return response
  res.status(200).json({
    status: "success",
    message: "Image updated successfull!",
    user,
  });
});

// Follow user function
exports.follow = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  // If requested and login in users are same return an error
  if (String(userId) === String(req.user._id)) {
    return next(new AppError("You cannot follow youself!", 400));
  }

  const user = await User.findById(userId).select("+followers");
  // If already following a user return an error
  if (user.followers.includes(req.user._id))
    return next(new AppError("You are already following this user!"), 400);

  // Add a user in folowers arra
  user.followers.unshift(req.user._id);
  await user.save({ validateBeforeSave: false });

  // add a user in following array
  const currentUser = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { following: user._id } },
    { new: true }
  );

  // return response
  res.status(200).json({
    status: "success",
    message: "You are now following this user",
    user: currentUser,
  });
});

// Unfollow a user
exports.unFollow = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  // If login user and the requested users are same return an error
  if (String(userId) === String(req.user._id)) {
    return next(new AppError("You cannot unfollow yourself!", 400));
  }

  // Remove user from followers array
  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  );

  // Rmove user from following array
  const currentUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: userId },
    },
    { new: true }
  );

  // Return response
  res.status(200).json({
    status: "success",
    message: "You are now unfollowing the requested user!",
    user: currentUser,
  });
});

// Get suggested users
exports.getSuggestedUsers = catchAsync(async (req, res, next) => {
  const { following } = req.user;
  const followingIds = following.map((item) => item._id);
  const suggestedUsers = await User.aggregate([
    { $match: { _id: { $nin: [...followingIds, req.user._id] } } },
    { $project: { name: 1, email: 1, photo: 1 } },
    { $sample: { size: 10 } },
  ]);

  res.status(200).json({
    status: "success",
    length: suggestedUsers.length,
    suggestedUsers,
  });
});

// update user data
exports.updateUserData = catchAsync(async (req, res, next) => {
  // Return an error if password and confirm password exists in data
  if (req.password || req.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for updating password, for password use /updatePassword.",
        400
      )
    );
  }

  // Get name and email from body
  const { name, email } = req.body;

  // Create an object from data to be updated
  const data = {
    name,
    email,
  };

  const user = await User.findById(req.user._id);
  let result;
  // if there is an image in data than delete old one and upload new image
  if (req.file) {
    if (user.photoId) await deleteImage(user.photoId);
    result = await uploadImage(req, next);
  }

  // If the image is uploaded successfully than add its url and id in data obj
  if (result) {
    data.photo = result.url;
    data.photoId = result.public_id;
  }

  // Update the user
  const newUser = await User.findByIdAndUpdate(user._id, data, {
    new: true,
    runValidators: true,
  });

  // Return response
  res.status(200).json({
    status: "success",
    newUser,
  });
});

// update user Password
exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  await User.findByIdAndUpdate(
    req.user._id,
    { password, passwordConfirm },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Password updated successfully!",
  });
});
