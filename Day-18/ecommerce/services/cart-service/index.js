require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const express = require('express');
const connectDB = require('./db');
const cartRoutes = require('./cart.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/cart', cartRoutes);

const PORT = process.env.CART_SERVICE_PORT || 3002;
app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));