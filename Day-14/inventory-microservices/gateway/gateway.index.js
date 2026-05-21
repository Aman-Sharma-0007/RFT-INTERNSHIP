require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const gatewayRoutes = require('./gateway.routes');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.GATEWAY_PORT || 3000;

app.use('/api', gatewayRoutes);

app.listen(PORT, () => {
  console.log(`\n🚀  API Gateway       →  http://localhost:${PORT}`);
  console.log(`    Endpoints at     →  http://localhost:${PORT}/api/...\n`);
});