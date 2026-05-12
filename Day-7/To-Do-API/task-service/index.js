require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express    = require('express');
const connectDB  = require('../shared/db');
const taskRoutes = require('./task.routes');
const { errorHandler } = require('../shared/errorHandler');

const app  = express();
const PORT = process.env.TASK_SERVICE_PORT || 1001;

connectDB();

app.use(express.json());
app.use('/tasks', taskRoutes);
app.get('/health', (_, res) => res.json({ service: 'task-service', port: PORT }));
app.use(errorHandler);

app.listen(PORT, () => console.log(` Task Service    → http://localhost:${PORT}`));