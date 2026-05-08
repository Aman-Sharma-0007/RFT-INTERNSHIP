require('dotenv').config({ path: '../../.env' });
const express = require('express');
const logger = require('../../middleware/logger');
const helloRoutes = require('./hello.routes');

const app = express();
app.use(logger);

app.use('/', helloRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found in Hello Service' });
});

const PORT = process.env.HELLO_PORT || 5001;
app.listen(PORT, () => console.log(`✅ Hello Service      → http://localhost:${PORT}/hello`));