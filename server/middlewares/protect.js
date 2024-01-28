const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// To protect routes from unauth users
module.exports = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    // eslint-disable-next-line
    token = req.cookies.token;
  }
  // If no token exists return the error
  if (!token || token === "null") {
    return next(
      new AppError("You are not logged in, Please login to get access!", 401)
    );
  }
  // Decode the token to get id of the user
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user exists
  const user = await User.findOne({ _id: decoded.id })
    .populate({
      path: "followers",
      select: "name email photo",
    })
    .populate({
      path: "following",
      select: "name photo email",
    });

  // If user is no longer exists return an error
  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exists!",
        401
      )
    );
  }

  // If every thing ok add user to req obj
  req.user = user;

  next();
});
