require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./product.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);

const PORT = process.env.PRODUCT_SERVICE_PORT || 3001;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));