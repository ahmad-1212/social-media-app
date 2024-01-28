const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name!"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email!"],
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      minLength: [8, "Password should be at least 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide confirm password!"],
      validate: {
        validator: function (val) {
          return this.get("password") === val;
        },
        message: "Password should be the same!",
      },
    },
    coverPhoto: {
      type: String,
    },
    coverPhotoId: String,
    photo: {
      type: String,
    },
    photoId: String,
    notification: Boolean,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        select: false,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        select: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // If password is not modified simply return
  if (!this.isModified("password")) return next();

  // Hash password in cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove password confirm field
  this.passwordConfirm = undefined;
  next();
});

// Function to check if password is correct
userSchema.methods.correctPassword = async function (
  enterPassword,
  userPassword
) {
  return await bcrypt.compare(enterPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
