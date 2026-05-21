const db = require('../shared/db');
const THRESHOLD = process.env.LOW_STOCK_THRESHOLD || 5;

// UPDATE QUANTITY
const updateQuantity = (req, res) => {
  const { quantity } = req.body;

  if (quantity == null || quantity < 0)
    return res.status(400).json({ error: 'quantity must be >= 0' });

  const product = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(req.params.id);

  if (!product)
    return res.status(404).json({ error: 'Product not found' });

  db.prepare('UPDATE products SET quantity = ? WHERE id = ?')
    .run(quantity, req.params.id);

  const response = {
    success: true,
    message: 'Quantity updated successfully',
    data: { ...product, quantity }
  };

  if (quantity <= THRESHOLD) {
    response.alert = {
      type: 'LOW_STOCK',
      message: `⚠️  "${product.name}" is low on stock! Only ${quantity} units left.`
    };
  }

  res.json(response);
};

// GET LOW STOCK
const getLowStock = (req, res) => {
  const threshold = parseInt(req.query.threshold) || THRESHOLD;

  const products = db
    .prepare('SELECT * FROM products WHERE quantity <= ? ORDER BY quantity ASC')
    .all(threshold);

  res.json({
    success: true,
    threshold,
    lowStockCount: products.length,
    data: products
  });
};

// GET INVENTORY OVERVIEW
const getInventory = (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  res.json({
    success: true,
    totalProducts: products.length,
    totalInventoryValue: `₹${totalValue.toFixed(2)}`,
    data: products
  });
};

module.exports = { updateQuantity, getLowStock, getInventory };