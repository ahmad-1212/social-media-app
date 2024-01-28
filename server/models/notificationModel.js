const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Related user is required!"],
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification should be related to a user"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Notification should be related to a post"],
    },
    type: {
      type: String,
      required: [true, "Type is required!"],
      enum: {
        values: ["like", "comment"],
        message: "Type should be only like or comment",
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: [true, "Text for notification is required!"],
    },
  },
  {
    timestamps: true,
  }
);

// Populate fromUser field
notificationSchema.pre(/^find/, function (next) {
  this.populate("fromUser", { email: true, name: true, photo: true });
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
