const Post = require("../models/postModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

module.exports = async (postId, user, type) => {
  try {
    const text = `${user.name} ${
      type === "like" ? "like" : "commented on"
    } your post`;

    // Take out post creator from post
    const post = await Post.findById(postId);
    const { creator } = post;
    if (String(creator._id) === String(user._id)) return;

    // Set notification field to true
    const postCreator = await User.findByIdAndUpdate(creator._id, {
      notification: true,
    });

    // Create notification
    await Notification.create({
      toUser: postCreator._id,
      fromUser: user._id,
      post: postId,
      type: "like",
      text: text,
    });
  } catch (err) {
    /* eslint-disable*/
    console.log(err);
    return;
  }
};
