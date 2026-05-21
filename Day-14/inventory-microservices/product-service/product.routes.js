const express = require('express');
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} = require('./product.controller');

router.post('/',    addProduct);
router.get('/',     getAllProducts);
router.get('/:id',  getProductById);
router.delete('/:id', deleteProduct);

module.exports = router;