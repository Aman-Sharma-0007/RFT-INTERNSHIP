require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
});