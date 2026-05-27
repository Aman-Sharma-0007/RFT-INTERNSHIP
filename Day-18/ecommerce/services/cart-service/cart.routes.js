const express = require('express');
const router = express.Router();
const ctrl = require('./cart.controller');

router.get('/:userId',              ctrl.getCart);
router.post('/add',                 ctrl.addToCart);
router.delete('/:userId/clear',     ctrl.clearCart);
router.delete('/:userId/:productId', ctrl.removeFromCart);

module.exports = router;