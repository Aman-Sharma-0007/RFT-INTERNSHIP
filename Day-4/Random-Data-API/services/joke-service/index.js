require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const jokeRoute = require('./joke.route');

const app = express();
const PORT = process.env.JOKE_PORT || 4001;

app.use(express.json());
app.use('/joke', jokeRoute);

app.listen(PORT, () => {
  console.log(`Joke Service running on http://localhost:${PORT}`);
});