const express = require('express');
const router = express.Router();
const ctrl = require('./product.controller');

router.get('/',              ctrl.getAllProducts);
router.get('/:id',          ctrl.getProductById);
router.post('/',             ctrl.createProduct);
router.patch('/:id/stock',  ctrl.updateStock);

module.exports = router;