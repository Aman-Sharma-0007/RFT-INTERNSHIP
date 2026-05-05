const Post = require("../models/Post");

// @route POST /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const post = await Post.create({ title, content, author: req.user.id });
    await post.populate("author", "name email");

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.json({ total: posts.length, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/posts/user/:userId
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({ total: posts.length, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied! Not the owner" });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();

    res.json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied! Not the owner" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route POST /api/posts/:id/comments
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Comment text required" });

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();
    await post.populate("comments.user", "name");

    res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/posts/:id/comments/:commentId
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied! Not the owner" });

    comment.deleteOne();
    await post.save();

    res.json({ message: "Comment deleted", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getAllPosts, getPostsByUser, updatePost, deletePost, addComment, deleteComment };