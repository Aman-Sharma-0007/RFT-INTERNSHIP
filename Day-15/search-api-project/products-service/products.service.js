const pool = require("../db/db");

const searchProducts = async ({ name, category, minPrice, maxPrice }) => {
  let query  = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (name) {
    query += " AND name LIKE ?";
    params.push(`%${name}%`);
  }
  if (category) {
    query += " AND category LIKE ?";
    params.push(`%${category}%`);
  }
  if (minPrice) {
    query += " AND price >= ?";
    params.push(Number(minPrice));
  }
  if (maxPrice) {
    query += " AND price <= ?";
    params.push(Number(maxPrice));
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

module.exports = { searchProducts };