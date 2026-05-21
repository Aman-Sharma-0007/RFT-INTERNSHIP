require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const inventoryRoutes = require('./inventory.routes');

const app = express();
app.use(express.json());

const PORT = process.env.INVENTORY_PORT || 3002;

app.use('/inventory', inventoryRoutes);

app.listen(PORT, () =>
  console.log(`📦  Inventory Service  →  http://localhost:${PORT}`)
);