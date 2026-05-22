const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors    = require("cors");
const { searchPostsController } = require("./posts.controller");

const app = express();
app.use(cors());
app.use(express.json());

// GET /search?title=node
// GET /search?author=rahul&tag=api
app.get("/search", searchPostsController);

app.get("/health", (req, res) => {
  res.json({ service: "posts", status: "running", port: process.env.POSTS_PORT });
});

const PORT = process.env.POSTS_PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ Posts Service     →  http://localhost:${PORT}`);
});