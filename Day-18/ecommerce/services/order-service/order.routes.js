const express = require('express');
const router = express.Router();
const ctrl = require('./order.controller');

router.post('/place',           ctrl.placeOrder);
router.get('/user/:userId',     ctrl.getOrdersByUser);
router.get('/:id',              ctrl.getOrderById);

module.exports = router;