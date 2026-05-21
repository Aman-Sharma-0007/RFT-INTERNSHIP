require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const productRoutes = require('./product.routes');

const app = express();
app.use(express.json());

const PORT = process.env.PRODUCT_PORT || 3001;

app.use('/products', productRoutes);

app.listen(PORT, () =>
  console.log(`🛍️  Product Service  →  http://localhost:${PORT}`)
);