const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.POST_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "post-service", status: "running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Post Service connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Post Service running on :${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });