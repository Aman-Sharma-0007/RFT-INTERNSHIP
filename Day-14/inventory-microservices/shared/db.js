require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../', process.env.DB_PATH);
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id         INTEGER  PRIMARY KEY AUTOINCREMENT,
    name       TEXT     NOT NULL UNIQUE,
    price      REAL     NOT NULL,
    quantity   INTEGER  NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;