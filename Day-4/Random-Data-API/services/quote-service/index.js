require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const quoteRoute = require('./quote.route');

const app = express();
const PORT = process.env.QUOTE_PORT || 4000;

app.use(express.json());
app.use('/quote', quoteRoute);

app.listen(PORT, () => {
  console.log(`Quote Service running on http://localhost:${PORT}`);
});