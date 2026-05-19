const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ success: false, message: "Title and content are required" });

    const post = await Post.create({ title, content });
    res.status(201).json({ success: true, message: "Post created", data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, message: "Post updated", data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };