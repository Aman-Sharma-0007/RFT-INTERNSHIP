const express       = require('express');
const idguardRoutes = require('./idguard.routes');

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ service: 'idguard-service', status: 'OK' }));
app.use('/', idguardRoutes);

module.exports = app;