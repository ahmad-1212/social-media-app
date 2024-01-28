const express = require("express");
const postController = require("../controllers/postController");
const protect = require("../middlewares/protect");
const likeRouter = require("./likeRoutes");
const commentRouter = require("./commentRoutes");
const multerUpload = require("../middlewares/multerUpload");

const router = express.Router();

router.use("/:postId/likes", likeRouter);
router.use("/:postId/comments", commentRouter);

router.use(protect);
router
  .route("/")
  .post(multerUpload.single("postImage"), postController.createPost)
  .get(postController.getPosts);
router.route("/:postId").delete(postController.deletePost);

module.exports = router;
