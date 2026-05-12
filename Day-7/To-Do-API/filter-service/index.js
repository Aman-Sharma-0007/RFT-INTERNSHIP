require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express      = require('express');
const connectDB    = require('../shared/db');
const filterRoutes = require('./filter.routes');
const { errorHandler } = require('../shared/errorHandler');

const app  = express();
const PORT = process.env.FILTER_SERVICE_PORT || 1003;

connectDB();

app.use(express.json());
app.use('/tasks', filterRoutes);
app.get('/health', (_, res) => res.json({ service: 'filter-service', port: PORT }));
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Filter Service  → http://localhost:${PORT}`));