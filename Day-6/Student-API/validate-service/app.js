const express        = require('express');
const validateRoutes = require('./validate.routes');

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ service: 'validate-service', status: 'OK' }));
app.use('/', validateRoutes);

module.exports = app;