const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors    = require("cors");
const { searchUsersController } = require("./users.controller");

const app = express();
app.use(cors());
app.use(express.json());

// GET /search?name=rahul
// GET /search?role=admin
app.get("/search", searchUsersController);

app.get("/health", (req, res) => {
  res.json({ service: "users", status: "running", port: process.env.USERS_PORT });
});

const PORT = process.env.USERS_PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Users Service     →  http://localhost:${PORT}`);
});