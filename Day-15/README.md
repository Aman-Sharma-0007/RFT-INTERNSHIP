# Day 15 — Search API (Database Querying)

A microservice-based Search API built with Node.js, Express, MySQL, and Axios. This project demonstrates dynamic database querying, partial match search, and multiple filters across three independent services routed through a central API Gateway.

---

## Project Structure

```bash
search-api-project/
├── .env
├── package.json
├── db/
│   └── db.js
├── gateway/
│   └── gateway.js
├── products-service/
│   ├── products.routes.js
│   ├── products.controller.js
│   └── products.service.js
├── users-service/
│   ├── users.routes.js
│   ├── users.controller.js
│   └── users.service.js
└── posts-service/
    ├── posts.routes.js
    ├── posts.controller.js
    └── posts.service.js
```

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MySQL (`mysql2/promise`)
- **HTTP Client** — Axios
- **Architecture** — Microservices with API Gateway
- **Environment** — dotenv

---

## Architecture Overview

```text
Client (Postman)
        |
        ▼
API Gateway (port 3000)
        |
        ├── /products/*  → Products Service (3001)
        ├── /users/*     → Users Service (3002)
        └── /posts/*     → Posts Service (3003)
        |
        ▼
MySQL Database (searchdb)
```

Each service has its own port and responsibility.  
The Gateway uses Axios to forward requests and stream responses back to the client.

---

## Concepts Covered

| Concept | Implementation |
|---|---|
| Querying | `SELECT * FROM table WHERE 1=1` dynamic SQL |
| Filtering | Multiple `AND` conditions built at runtime |
| Partial Match Search ⭐ | `LIKE %value%` for fuzzy search |
| Multiple Filters ⭐ | All query params combined in one SQL query |
| Efficient Retrieval | MySQL connection pooling via `mysql2/promise` |
| Microservices | Each service has its own port and responsibility |
| API Gateway | Single entry point routes using Axios |

---

# Getting Started

## Prerequisites

- Node.js installed
- MySQL installed and running
- MySQL Workbench (recommended)

---

## 1. Clone the Repository

```bash
git clone https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/tree/main/Day-15

cd search-api-project
```

---

## 2. Install Dependencies

```bash
npm install
```

---


## 3. Setup the Database

Open MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS searchdb;

USE searchdb;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author VARCHAR(255),
  tag VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

**Insert Data to it**


## 5. Start All Services

```bash
npm run start:all
```

You should see:

```bash
✅ Products Service  → http://localhost:3001
✅ Users Service     → http://localhost:3002
✅ Posts Service     → http://localhost:3003
🚀 API Gateway running on http://localhost:3000
```

---

# API Reference

---

## Health Check

### Request

```http
GET http://localhost:3000/health
```

### Response

```json
{
  "gateway": "✅ running",
  "services": {
    "products": "✅ running",
    "users": "✅ running",
    "posts": "✅ running"
  }
}
```

---

# Products Service

## Base URL

```http
http://localhost:3000/products
```

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| GET | /search | name | Search by product name |
| GET | /search | category | Filter by category |
| GET | /search | minPrice | Minimum price |
| GET | /search | maxPrice | Maximum price |

---

## Examples

```http
GET /products/search?name=samsung
```

```http
GET /products/search?category=Phone
```

```http
GET /products/search?maxPrice=20000
```

```http
GET /products/search?category=Phone&maxPrice=75000
```

---

## Success Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 2,
      "name": "Samsung Galaxy S24",
      "category": "Phone",
      "price": "69999.00",
      "description": "Samsung flagship",
      "created_at": "2026-05-22T08:33:15.000Z"
    }
  ]
}
```

---

# Users Service

## Base URL

```http
http://localhost:3000/users
```

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| GET | /search | name | Search by user name |
| GET | /search | email | Search by email |
| GET | /search | role | Filter by role |

---

## Examples

```http
GET /users/search?name=rahul
```

```http
GET /users/search?role=admin
```

```http
GET /users/search?name=pri
```

---

# Posts Service

## Base URL

```http
http://localhost:3000/posts
```

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| GET | /search | title | Search by title |
| GET | /search | author | Search by author |
| GET | /search | tag | Filter by tag |

---

## Examples

```http
GET /posts/search?tag=nodejs
```

```http
GET /posts/search?author=amit
```

```http
GET /posts/search?author=rahul&tag=nodejs
```

---

# Error Responses

## 400 Bad Request

```json
{
  "success": false,
  "message": "Provide at least one filter: name, category, minPrice, maxPrice"
}
```

---

## 404 Not Found

```json
{
  "success": false,
  "message": "No products found"
}
```

---

## 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

# Testing with Postman

| Test | URL | Expected Status |
|---|---|---|
| Gateway health | `/health` | 200 |
| Products by name | `/products/search?name=samsung` | 200 |
| Products by category | `/products/search?category=Phone` | 200 |
| Products by max price | `/products/search?maxPrice=20000` | 200 |
| Products multiple filters | `/products/search?category=Phone&maxPrice=75000` | 200 |
| Users by name | `/users/search?name=rahul` | 200 |
| Users by role | `/users/search?role=user` | 200 |
| Users partial match | `/users/search?name=pri` | 200 |
| Posts by tag | `/posts/search?tag=nodejs` | 200 |
| Posts by author | `/posts/search?author=amit` | 200 |
| Posts multiple filters | `/posts/search?author=rahul&tag=nodejs` | 200 |
| No params error | `/products/search` | 400 |
| Not found error | `/products/search?name=abcxyz` | 404 |

---

# How the Search Works

```js
let query = "SELECT * FROM products WHERE 1=1";

const params = [];

if (name) {
  query += " AND name LIKE ?";
  params.push(`%${name}%`);
}

if (category) {
  query += " AND category LIKE ?";
  params.push(`%${category}%`);
}

if (maxPrice) {
  query += " AND price <= ?";
  params.push(Number(maxPrice));
}

const [rows] = await pool.query(query, params);
```

`WHERE 1=1` allows dynamic appending of multiple `AND` conditions safely.

---

# Scripts

| Command | Description |
|---|---|
| `npm run start:all` | Start all services |
| `npm run start:gateway` | Start API Gateway |
| `npm run start:products` | Start Products Service |
| `npm run start:users` | Start Users Service |
| `npm run start:posts` | Start Posts Service |

---

# Author

**Name:Aman Sharma**

Built as part of the **GOW AI Academy Backend Internship — Day 15**

---