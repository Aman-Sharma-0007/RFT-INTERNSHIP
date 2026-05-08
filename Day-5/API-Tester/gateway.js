require('dotenv').config(); // ← must be first line!
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./middleware/logger');

const app = express();
app.use(logger);

// ⚠️ These must be INSIDE after dotenv loads
const SERVICES = {
  '/hello':     `http://localhost:${process.env.HELLO_PORT}`,
  '/calculate': `http://localhost:${process.env.CALCULATE_PORT}`,
  '/users':     `http://localhost:${process.env.USERS_PORT}`,
  '/quote':     `http://localhost:${process.env.QUOTE_PORT}`
};

// Add this to debug — check what ports are loaded
console.log('Services map:', SERVICES);

Object.entries(SERVICES).forEach(([route, target]) => {
  app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
});

app.get('/', (req, res) => {
  res.json({
    name: 'Day 5 — API Gateway | GOW AI Academy',
    status: '🟢 running',
    availableRoutes: Object.keys(SERVICES),
    tip: 'All requests go through port 3000 only!'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route "${req.originalUrl}" not found`,
    availableRoutes: Object.keys(SERVICES)
  });
});

const PORT = process.env.GATEWAY_PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Gateway            → http://localhost:${PORT}`);
  console.log('─────────────────────────────────────────');
  Object.entries(SERVICES).forEach(([route, target]) => {
    console.log(`🔗 ${route.padEnd(12)} → ${target}${route}`);
  });
  console.log('─────────────────────────────────────────\n');
});