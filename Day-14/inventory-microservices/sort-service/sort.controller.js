const db = require('../shared/db');

// SORT BY PRICE
const sortByPrice = (req, res) => {
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

  const products = db
    .prepare(`SELECT * FROM products ORDER BY price ${order}`)
    .all();

  res.json({
    success: true,
    sortedBy: 'price',
    order: order === 'ASC' ? 'cheapest → expensive' : 'expensive → cheapest',
    count: products.length,
    data: products
  });
};

// SORT BY QUANTITY
const sortByQuantity = (req, res) => {
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

  const products = db
    .prepare(`SELECT * FROM products ORDER BY quantity ${order}`)
    .all();

  res.json({
    success: true,
    sortedBy: 'quantity',
    order: order === 'ASC' ? 'lowest → highest' : 'highest → lowest',
    count: products.length,
    data: products
  });
};

// FILTER BY PRICE RANGE
const filterByPriceRange = (req, res) => {
  const { min = 0, max = 999999 } = req.query;

  const products = db
    .prepare('SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY price ASC')
    .all(Number(min), Number(max));

  res.json({
    success: true,
    filter: `₹${min} – ₹${max}`,
    count: products.length,
    data: products
  });
};

module.exports = { sortByPrice, sortByQuantity, filterByPriceRange };