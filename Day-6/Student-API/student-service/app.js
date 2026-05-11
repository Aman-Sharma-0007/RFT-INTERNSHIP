const express       = require('express');
const studentRoutes = require('./student.routes');

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ service: 'student-service', status: 'OK' }));
app.use('/students', studentRoutes);

module.exports = app;