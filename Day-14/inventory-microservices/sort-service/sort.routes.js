const express = require('express');
const router = express.Router();

const {
  sortByPrice,
  sortByQuantity,
  filterByPriceRange
} = require('./sort.controller');

router.get('/by-price',    sortByPrice);
router.get('/by-quantity', sortByQuantity);
router.get('/price-range', filterByPriceRange);

module.exports = router;