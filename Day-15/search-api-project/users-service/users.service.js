const pool = require("../db/db");

const searchUsers = async ({ name, email, role }) => {
  let query    = "SELECT * FROM users WHERE 1=1";
  const params = [];

  if (name) {
    query += " AND name LIKE ?";
    params.push(`%${name}%`);
  }
  if (email) {
    query += " AND email LIKE ?";
    params.push(`%${email}%`);
  }
  if (role) {
    query += " AND role = ?";
    params.push(role);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

module.exports = { searchUsers };