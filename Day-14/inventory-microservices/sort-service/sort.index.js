require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const sortRoutes = require('./sort.routes');

const app = express();
app.use(express.json());

const PORT = process.env.SORT_PORT || 3003;

app.use('/sort', sortRoutes);

app.listen(PORT, () =>
  console.log(`🔃  Sort Service       →  http://localhost:${PORT}`)
);