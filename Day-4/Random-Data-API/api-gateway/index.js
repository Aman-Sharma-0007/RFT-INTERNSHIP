require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.GATEWAY_PORT ||4003 ;

async function forwardRequest(serviceUrl, res) {
  try {
    const response = await axios.get(serviceUrl);
    res.json(response.data);
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service unavailable',
      error: error.message,
    });
  }
}

app.get('/quote', (req, res) => forwardRequest(process.env.QUOTE_SERVICE, res));
app.get('/joke',  (req, res) => forwardRequest(process.env.JOKE_SERVICE, res));
app.get('/fact',  (req, res) => forwardRequest(process.env.FACT_SERVICE, res));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Gateway is running',
    services: {
      quote: process.env.QUOTE_SERVICE,
      joke: process.env.JOKE_SERVICE,
      fact: process.env.FACT_SERVICE,
    },
    timestamp: new Date(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.listen(PORT, () => {
  console.log(`\nAPI Gateway running on http://localhost:${PORT}`);
  console.log(`  /quote → ${process.env.QUOTE_SERVICE}`);
  console.log(`  /joke  → ${process.env.JOKE_SERVICE}`);
  console.log(`  /fact  → ${process.env.FACT_SERVICE}\n`);
});