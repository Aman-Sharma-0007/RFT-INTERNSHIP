# 📦 Inventory Management API — Microservices Architecture

A backend project built with **Node.js**, **Express.js**, and **SQLite** using a **Microservices Architecture** approach.  
Each microservice runs independently on its own port and communicates through a centralized **API Gateway**.

---

# 🏗️ Architecture Overview

```text
                CLIENT
                   │
                   ▼
        [ API Gateway :3000 ]
         Single Entry Point
                   │
   ┌───────────────┼────────────────┐
   │               │                │
   ▼               ▼                ▼

[Product]      [Inventory]       [Sort]
 Service         Service         Service
 :3001           :3002           :3003

 Add/Get        Quantity        Sorting &
 Delete         Management      Filtering

                   │
                   ▼
           [ SQLite Database ]
            Shared Local DB
```

---

# 📁 Folder Structure

```text
inventory-microservices/
│
├── shared/
│   └── db.js
│
├── product-service/
│   ├── product.controller.js
│   ├── product.routes.js
│   └── product.index.js
│
├── inventory-service/
│   ├── inventory.controller.js
│   ├── inventory.routes.js
│   └── inventory.index.js
│
├── sort-service/
│   ├── sort.controller.js
│   ├── sort.routes.js
│   └── sort.index.js
│
├── gateway/
│   ├── gateway.routes.js
│   └── gateway.index.js
│
├── .env
├── package.json
├── start.sh
└── README.md
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| better-sqlite3 | Lightweight Database |
| Axios | Inter-service Communication |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |

---

# 🚀 Getting Started

## 📌 Prerequisites

- Node.js (v16 or above)
- npm
- Postman

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/Day-14

cd inventory-microservices
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---


## 4️⃣ Start All Services

```bash
chmod +x start.sh

./start.sh
```

---

## ▶️ OR Run Services Individually

```bash
npm run product
```

```bash
npm run inventory
```

```bash
npm run sort
```

```bash
npm run gateway
```

---

# ✅ Running Services

```text
🛍️  Product Service    → http://localhost:3001
📦  Inventory Service  → http://localhost:3002
🔃  Sort Service       → http://localhost:3003
🚀  API Gateway        → http://localhost:3000
```

---

# 🌐 Service Ports

| Service | Port | URL |
|---|---|---|
| API Gateway | 3000 | http://localhost:3000/api |
| Product Service | 3001 | http://localhost:3001/products |
| Inventory Service | 3002 | http://localhost:3002/inventory |
| Sort Service | 3003 | http://localhost:3003/sort |

> ✅ Recommended: Use only the **Gateway API** for client requests.

---

# 📡 API Endpoints

---

# 💚 Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check all services |

---

# 🛍️ Product Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Add Product |
| GET | `/api/products` | Get All Products |
| GET | `/api/products/:id` | Get Product by ID |
| DELETE | `/api/products/:id` | Delete Product |

---

## ➕ Add Product

### Request Body

```json
{
  "name": "Laptop",
  "price": 999.99,
  "quantity": 10
}
```

### Response

```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "quantity": 10
  }
}
```

---

# 📦 Inventory Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/inventory` | Inventory Overview |
| GET | `/api/inventory/low-stock` | Get Low Stock Items |
| PATCH | `/api/inventory/:id/quantity` | Update Quantity |

---

## 🔄 Update Quantity

### Request Body

```json
{
  "quantity": 3
}
```

### Response

```json
{
  "success": true,
  "message": "Quantity updated successfully",
  "data": {
    "id": 2,
    "name": "Mouse",
    "quantity": 3
  },
  "alert": {
    "type": "LOW_STOCK",
    "message": "⚠️ Mouse is low on stock! Only 3 units left."
  }
}
```

---

# 🔃 Sort Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/sort/by-price?order=asc` | Sort Price Ascending |
| GET | `/api/sort/by-price?order=desc` | Sort Price Descending |
| GET | `/api/sort/by-quantity?order=asc` | Sort Quantity Ascending |
| GET | `/api/sort/by-quantity?order=desc` | Sort Quantity Descending |
| GET | `/api/sort/price-range?min=20&max=500` | Filter by Price Range |

---

# 📊 Inventory Overview Response

```json
{
  "success": true,
  "totalProducts": 4,
  "totalInventoryValue": "₹20754.46",
  "data": []
}
```

---

# ❌ Error Handling

| Status Code | Meaning |
|---|---|
| 400 | Bad Request |
| 404 | Product Not Found |
| 409 | Duplicate Product |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Example Error Response

```json
{
  "error": "Product already exists"
}
```

---

# 🧪 Postman Testing Flow

```text
1.  GET    /api/health
2.  POST   /api/products
3.  GET    /api/products
4.  GET    /api/products/:id
5.  PATCH  /api/inventory/:id/quantity
6.  GET    /api/inventory
7.  GET    /api/inventory/low-stock
8.  GET    /api/sort/by-price?order=asc
9.  GET    /api/sort/by-price?order=desc
10. DELETE /api/products/:id
```

---

# 📌 Concepts Covered

| Concept | Description |
|---|---|
| Microservices | Independent services |
| API Gateway | Centralized routing |
| REST API | Proper HTTP methods |
| SQLite | Lightweight database |
| Business Logic | Low stock alerts |
| Error Handling | Structured API errors |
| Environment Variables | Config management |
| Separation of Concerns | Routes → Controllers |

---

# 👨‍💻 Author

- **Name:** Aman Sharma
- **Internship:** GOW AI Academy — Backend Internship
- **Day:** Day 14
- **Project:** Inventory Management API

---

# 📝 License

This project is for learning purposes as part of the GOW AI Academy Backend Internship Program.