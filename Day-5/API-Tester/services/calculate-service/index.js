require('dotenv').config({ path: '../../.env' });
const express = require('express');
const logger = require('../../middleware/logger');
const calculateRoutes = require('./calculate.routes');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/', calculateRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found in Calculate Service' });
});

const PORT = process.env.CALCULATE_PORT || 5002;
app.listen(PORT, () => console.log(`✅ Calculate Service  → http://localhost:${PORT}/calculate`));