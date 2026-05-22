const pool = require("../db/db");

const searchPosts = async ({ title, author, tag }) => {
  let query    = "SELECT * FROM posts WHERE 1=1";
  const params = [];

  if (title) {
    query += " AND title LIKE ?";
    params.push(`%${title}%`);
  }
  if (author) {
    query += " AND author LIKE ?";
    params.push(`%${author}%`);
  }
  if (tag) {
    query += " AND tag LIKE ?";
    params.push(`%${tag}%`);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

module.exports = { searchPosts };