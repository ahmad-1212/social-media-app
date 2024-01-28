const mongoose = require("mongoose");
const Post = require("./postModel");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Like should be related to a post!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: [true, "Like should be related to a User!"],
    },
  },
  { timestamps: true }
);

// A user can give only one like to a post
likeSchema.index({ post: 1, user: 1 }, { unique: true });

// Add one to likes in Post after saving like to DB
likeSchema.post("save", async function (doc) {
  const post = await Post.findById(doc.post);
  post.likes++;
  await post.save();
});

// Pass like from pre middleware to post middleware that after deleting a like it should be decreases from likes in post
likeSchema.pre("findOneAndDelete", async function (next) {
  this.like = await this.model.findOne(this.getQuery());
  next();
});

// Decrease likes by one
likeSchema.post("findOneAndDelete", async function (doc) {
  const post = await Post.findById(doc?.post);
  if (post) {
    post.likes--;
    post.save();
  }
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
