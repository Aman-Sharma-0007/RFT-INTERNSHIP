const { searchPosts } = require("./posts.service");

const searchPostsController = async (req, res) => {
  try {
    const { title, author, tag } = req.query;

    if (!title && !author && !tag) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one filter: title, author, tag",
      });
    }

    const results = await searchPosts({ title, author, tag });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    res.status(200).json({
      success: true,
      count:   results.length,
      data:    results,
    });

  } catch (error) {
    console.error("Posts controller error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { searchPostsController };