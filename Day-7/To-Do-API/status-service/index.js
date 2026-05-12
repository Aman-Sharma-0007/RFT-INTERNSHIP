require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express       = require('express');
const connectDB     = require('../shared/db');
const statusRoutes  = require('./status.routes');
const { errorHandler } = require('../shared/errorHandler');

const app  = express();
const PORT = process.env.STATUS_SERVICE_PORT || 1002;

connectDB();

app.use(express.json());
app.use('/tasks', statusRoutes);
app.get('/health', (_, res) => res.json({ service: 'status-service', port: PORT }));
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Status Service  → http://localhost:${PORT}`));