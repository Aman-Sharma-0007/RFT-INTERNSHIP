const db = require('../shared/db');


const addProduct = (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price == null || quantity == null)
    return res.status(400).json({ error: 'name, price, quantity are required' });

  if (price < 0 || quantity < 0)
    return res.status(400).json({ error: 'price and quantity must be >= 0' });

  try {
    const result = db
      .prepare('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)')
      .run(name, price, quantity);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: { id: result.lastInsertRowid, name, price, quantity }
    });
  } catch (err) {
    if (err.message.includes('UNIQUE'))
      return res.status(409).json({ error: `Product "${name}" already exists` });
    res.status(500).json({ error: err.message });
  }
};


const getAllProducts = (req, res) => {
  const products = db
    .prepare('SELECT * FROM products ORDER BY id DESC')
    .all();

  res.json({
    success: true,
    count: products.length,
    data: products
  });
};


const getProductById = (req, res) => {
  const product = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(req.params.id);

  if (!product)
    return res.status(404).json({ error: 'Product not found' });

  res.json({ success: true, data: product });
};


const deleteProduct = (req, res) => {
  const product = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(req.params.id);

  if (!product)
    return res.status(404).json({ error: 'Product not found' });

  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);

  res.json({
    success: true,
    message: `Product "${product.name}" deleted successfully`
  });
};

module.exports = { addProduct, getAllProducts, getProductById, deleteProduct };