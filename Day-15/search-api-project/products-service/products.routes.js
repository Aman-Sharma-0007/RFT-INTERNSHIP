const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors    = require("cors");
const { searchProductsController } = require("./products.controller");

const app = express();
app.use(cors());
app.use(express.json());

// Search endpoint
// GET /search?name=phone
// GET /search?name=phone&category=Phone&minPrice=5000&maxPrice=80000
app.get("/search", searchProductsController);

// Health check (called by gateway)
app.get("/health", (req, res) => {
  res.json({ service: "products", status: "running", port: process.env.PRODUCTS_PORT });
});

const PORT = process.env.PRODUCTS_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Products Service  →  http://localhost:${PORT}`);
});