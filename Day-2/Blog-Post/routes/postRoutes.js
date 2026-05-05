const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  addComment,
  deleteComment
} = require("../controllers/postController");

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/comments", protect, addComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

module.exports = router;