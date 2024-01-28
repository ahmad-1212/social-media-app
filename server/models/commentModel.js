const mongoose = require("mongoose");
const Post = require("./postModel");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Comment should be related to a post!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment should be related to a user!"],
    },
    content: {
      type: String,
      requried: [true, "Comment should not be empty!"],
    },
  },
  { timestamps: true }
);

// Populate user before and find action on comment doc
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

// Increase comment field in post by one
commentSchema.post("save", async function (doc) {
  const post = await Post.findById(doc.post);
  post.comments++;
  await post.save();
});

// Pass comment from pre middleware to post middleware that after deleting a comment it should be decreases from comments field in post
commentSchema.pre("findOneAndDelete", async function (next) {
  this.comment = await this.model.findOne(this.getQuery());
  next();
});

// Decrease comments by one
commentSchema.post("findOneAndDelete", async function (doc) {
  const post = await Post.findById(doc?.post);
  if (post) {
    post.comments--;
    post.save();
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
