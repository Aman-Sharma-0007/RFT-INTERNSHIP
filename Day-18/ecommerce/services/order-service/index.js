require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const express = require('express');
const connectDB = require('./db');
const orderRoutes = require('./order.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/orders', orderRoutes);

const PORT = process.env.ORDER_SERVICE_PORT || 3003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));