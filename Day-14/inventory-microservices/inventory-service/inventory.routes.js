const express = require('express');
const router = express.Router();

const {
  updateQuantity,
  getLowStock,
  getInventory
} = require('./inventory.controller');

router.get('/',                  getInventory);
router.get('/low-stock',         getLowStock);
router.patch('/:id/quantity',    updateQuantity);

module.exports = router;