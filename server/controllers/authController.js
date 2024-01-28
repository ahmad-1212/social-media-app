const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create and Send JWT token function
const createSendToken = (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Cookies options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
  };

  // If in production set secure to true
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("token", token, cookieOptions);

  // Remove user password
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Signup function
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  createSendToken(newUser, res, 201);
});

// Login function
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists
  if (!email && !password) {
    return next(new AppError("Please provide email and password!", 401));
  }

  if (!email || !password) {
    if (!email) {
      return next(new AppError("Please provide an email!", 401));
    }
    if (!password) {
      return next(new AppError("Please provide a password", 401));
    }
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");

  // Check if password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  // If every thing is Ok send response
  createSendToken(user, res, 200);
});

// Logout function
exports.logout = (req, res, next) => {
  const cookieOptions = {
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("token", "", cookieOptions);
  res.status(200).json({
    status: "success",
    message: "Logout successfully!",
  });
};
