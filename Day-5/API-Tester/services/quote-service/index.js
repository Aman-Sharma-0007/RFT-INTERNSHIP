require('dotenv').config({ path: '../../.env' });
const express = require('express');
const logger = require('../../middleware/logger');
const quoteRoutes = require('./quote.routes');

const app = express();
app.use(logger);

app.use('/', quoteRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found in Quote Service' });
});

const PORT = process.env.QUOTE_PORT || 5004;
app.listen(PORT, () => console.log(`✅ Quote Service      → http://localhost:${PORT}/quote`));