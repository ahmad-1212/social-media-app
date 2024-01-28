const express = require("express");
const commentController = require("../controllers/commentController");
const protect = require("../middlewares/protect");

const router = express.Router({ mergeParams: true });
router.use(protect);

// POST /posts/:postID/comments
// GET /posts/:postID/comments
router
  .route("/")
  .post(commentController.createComment)
  .get(commentController.getPostComments);

router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
