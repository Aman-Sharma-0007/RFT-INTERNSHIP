const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;
const POST_SERVICE = process.env.POST_SERVICE_URL;

app.use(cors());
app.use(express.json());

const forwardError = (error, res) => {
  if (error.response) {
    res.status(error.response.status).json(error.response.data);
  } else {
    res.status(503).json({ success: false, message: "Post service unavailable" });
  }
};

app.post("/api/posts", async (req, res) => {
  try {
    const { data } = await axios.post(`${POST_SERVICE}/api/posts`, req.body);
    res.status(201).json(data);
  } catch (err) { forwardError(err, res); }
});

app.get("/api/posts", async (req, res) => {
  try {
    const { data } = await axios.get(`${POST_SERVICE}/api/posts`);
    res.status(200).json(data);
  } catch (err) { forwardError(err, res); }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const { data } = await axios.get(`${POST_SERVICE}/api/posts/${req.params.id}`);
    res.status(200).json(data);
  } catch (err) { forwardError(err, res); }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const { data } = await axios.put(`${POST_SERVICE}/api/posts/${req.params.id}`, req.body);
    res.status(200).json(data);
  } catch (err) { forwardError(err, res); }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { data } = await axios.delete(`${POST_SERVICE}/api/posts/${req.params.id}`);
    res.status(200).json(data);
  } catch (err) { forwardError(err, res); }
});

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on :${PORT}`);
  console.log(`   → Forwarding to: ${POST_SERVICE}`);
});