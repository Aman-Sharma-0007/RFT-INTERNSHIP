const express = require('express');
const axios = require('axios');
const router = express.Router();

const SERVICES = {
  product:   `http://localhost:${process.env.PRODUCT_PORT   || 3001}`,
  inventory: `http://localhost:${process.env.INVENTORY_PORT || 3002}`,
  sort:      `http://localhost:${process.env.SORT_PORT      || 3003}`
};

// PROXY HELPER
const proxy = (serviceUrl) => async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url:    `${serviceUrl}${req.path}`,
      data:   req.body,
      params: req.query
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    const status  = err.response?.status || 503;
    const message = err.response?.data   || { error: 'Service unavailable' };
    res.status(status).json(message);
  }
};

// PRODUCT ROUTES
router.post(  '/products',             proxy(SERVICES.product));
router.get(   '/products',             proxy(SERVICES.product));
router.get(   '/products/:id',         proxy(SERVICES.product));
router.delete('/products/:id',         proxy(SERVICES.product));

// INVENTORY ROUTES
router.get(  '/inventory',             proxy(SERVICES.inventory));
router.get(  '/inventory/low-stock',   proxy(SERVICES.inventory));
router.patch('/inventory/:id/quantity',proxy(SERVICES.inventory));

// SORT ROUTES
router.get('/sort/by-price',           proxy(SERVICES.sort));
router.get('/sort/by-quantity',        proxy(SERVICES.sort));
router.get('/sort/price-range',        proxy(SERVICES.sort));

// HEALTH CHECK
router.get('/health', async (req, res) => {
  const [p, i, s] = await Promise.allSettled([
    axios.get(`${SERVICES.product}/products`),
    axios.get(`${SERVICES.inventory}/inventory`),
    axios.get(`${SERVICES.sort}/sort/by-price`)
  ]);

  res.json({
    gateway: '✅ UP',
    services: {
      product:   p.status === 'fulfilled' ? '✅ UP' : '❌ DOWN',
      inventory: i.status === 'fulfilled' ? '✅ UP' : '❌ DOWN',
      sort:      s.status === 'fulfilled' ? '✅ UP' : '❌ DOWN'
    }
  });
});

module.exports = router;