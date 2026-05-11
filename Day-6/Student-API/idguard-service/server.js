require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const app      = require('./app');

const PORT = process.env.IDGUARD_PORT || 6003;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`idguard-service   → http://localhost:${PORT}`)
    );
  })
  .catch(err => { console.error('MongoDB failed:', err.message); process.exit(1); });