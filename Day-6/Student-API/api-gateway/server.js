require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const app  = require('./gateway');
const PORT = process.env.GATEWAY_PORT || 6000;

app.listen(PORT, () =>
  console.log(`api-gateway       → http://localhost:${PORT}`)
);