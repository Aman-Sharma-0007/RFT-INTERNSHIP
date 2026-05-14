require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/db/connection');
const router = require('./src/gateway/router');

const app = express();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});