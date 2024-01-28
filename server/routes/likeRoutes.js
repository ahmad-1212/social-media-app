const express = require("express");
const likeController = require("../controllers/likeController");
const protect = require("../middlewares/protect");

const router = express.Router({ mergeParams: true });

router.use(protect);

// POST /posts/:postId/likes
// delete /posts/:postId/likes

router
  .route("/")
  .post(likeController.addLike)
  .delete(likeController.removeLike);

router.get("/getAllCurrentUserLikes", likeController.getAllCurrentUserLikes);

module.exports = router;
