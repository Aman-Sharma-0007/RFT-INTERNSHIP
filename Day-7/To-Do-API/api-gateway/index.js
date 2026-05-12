require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.GATEWAY_PORT || 1000;

const getTarget = (req) => {
    if (req.method === 'PATCH') return process.env.STATUS_SERVICE_URL;
    if (req.method === 'GET' && req.query.status) return process.env.FILTER_SERVICE_URL;
    return process.env.TASK_SERVICE_URL;
};

app.use('/tasks', createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL, // fallback target (required)
    router: getTarget,
    changeOrigin: true,
    pathRewrite: (path, req) => `/tasks${path}`, // re-add /tasks since express strips it
    on: {
        error: (err, req, res) => {
            res.status(502).json({ success: false, error: 'Service unavailable: ' + err.message });
        }
    }
}));

app.get('/health', (_, res) => res.json({ service: 'api-gateway', port: PORT }));

app.listen(PORT, () => console.log(`✅ API Gateway → http://localhost:${PORT}`));