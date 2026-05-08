require('dotenv').config({ path: '../../.env' });
const express = require('express');
const logger = require('../../middleware/logger');
const userRoutes = require('./user.routes');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/', userRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found in Users Service' });
});

const PORT = process.env.USERS_PORT || 5003;
app.listen(PORT, () => console.log(`✅ Users Service      → http://localhost:${PORT}/users`));