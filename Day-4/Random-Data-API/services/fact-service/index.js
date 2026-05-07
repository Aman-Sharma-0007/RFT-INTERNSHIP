require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const factRoute = require('./fact.route');

const app = express();
const PORT = process.env.FACT_PORT || 4002;

app.use(express.json());
app.use('/fact', factRoute);

app.listen(PORT, () => {
    console.log(`Fact Service running on http://localhost:${PORT}`);
});