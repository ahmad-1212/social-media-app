const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post should be related to user!"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please add an image to the Post!"],
    },
    imageId: String,
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate("creator");
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
