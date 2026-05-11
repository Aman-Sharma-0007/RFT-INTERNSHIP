require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app       = require('./app');
const connectDB = require('./db');

const PORT = process.env.STUDENT_PORT || 6001;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`student-service   → http://localhost:${PORT}`)
  );
});