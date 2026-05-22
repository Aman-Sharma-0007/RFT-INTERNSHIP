const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const axios   = require("axios");
const cors    = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SERVICES = {
  products: `http://localhost:${process.env.PRODUCTS_PORT || 3001}`,
  users:    `http://localhost:${process.env.USERS_PORT    || 3002}`,
  posts:    `http://localhost:${process.env.POSTS_PORT    || 3003}`,
};

// ─── Generic axios proxy helper ───────────────────────────────────────────────
const proxyRequest = (serviceUrl) => async (req, res) => {
  try {
    // Build the target URL: forward path + query string
    const targetUrl = `${serviceUrl}${req.path}`;

    const response = await axios({
      method:  req.method,
      url:     targetUrl,
      params:  req.query,   // forward ?name=phone&category=Phone etc.
      data:    req.body,    // forward body for POST/PUT
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(response.status).json(response.data);

  } catch (error) {
    // If the downstream service returned an error response, forward it
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    // Network / connection error (service not running)
    console.error(`Gateway error → ${serviceUrl}:`, error.message);
    res.status(503).json({
      success: false,
      message: `Service unavailable. Is the service running on ${serviceUrl}?`,
    });
  }
};

// ─── Routes ───────────────────────────────────────────────────────────────────
// /products/* → Products Service (port 3001)
app.use("/products", proxyRequest(SERVICES.products));

// /users/*    → Users Service (port 3002)
app.use("/users", proxyRequest(SERVICES.users));

// /posts/*    → Posts Service (port 3003)
app.use("/posts", proxyRequest(SERVICES.posts));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", async (req, res) => {
  // Ping every service with axios to report live status
  const statuses = await Promise.all(
    Object.entries(SERVICES).map(async ([name, url]) => {
      try {
        await axios.get(`${url}/health`, { timeout: 2000 });
        return { [name]: "✅ running" };
      } catch {
        return { [name]: "❌ down" };
      }
    })
  );

  res.json({
    gateway:  "✅ running",
    services: Object.assign({}, ...statuses),
  });
});

const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
  console.log(`   /products/search → port ${process.env.PRODUCTS_PORT}`);
  console.log(`   /users/search    → port ${process.env.USERS_PORT}`);
  console.log(`   /posts/search    → port ${process.env.POSTS_PORT}`);
});