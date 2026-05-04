const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/api', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected!'))
  .catch((err) => console.log(' MongoDB Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});