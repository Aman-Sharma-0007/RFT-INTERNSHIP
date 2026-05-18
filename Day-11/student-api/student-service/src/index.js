const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'student-service running' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Student Service running on port ${PORT}`));

