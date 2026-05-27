# E-Commerce Backend — Microservices Architecture

Built with Node.js, Express, MongoDB, and a microservices pattern as part of the GOW AI Academy RFT- Backend Internship (Day 18).

---

## Architecture

```text
Client
│
├── Product Service (Port 3001)
├── Cart Service    (Port 3002)
└── Order Service   (Port 3003)
```

Services communicate with each other directly via HTTP (axios). No API gateway.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Inter-service calls**: Axios
- **Dev tools**: Nodemon, Concurrently
- **Config**: Dotenv (single `.env` for all services)

---

## Folder Structure

```text
ecommerce-backend/
├── .env                          # Single env for all services
├── package.json                  # Single package.json for all services
└── services/
    ├── product-service/          # Port 3001
    │   ├── index.js
    │   ├── db.js
    │   ├── product.model.js
    │   ├── product.controller.js
    │   └── product.routes.js
    │
    ├── cart-service/             # Port 3002
    │   ├── index.js
    │   ├── db.js
    │   ├── cart.model.js
    │   ├── cart.controller.js
    │   └── cart.routes.js
    │
    └── order-service/            # Port 3003
        ├── index.js
        ├── db.js
        ├── order.model.js
        ├── order.controller.js
        └── order.routes.js
```

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally

### Installation

```bash
# Clone the repo
git clone https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/tree/main/Day-18

cd ecommerce-backend

# Install all dependencies (one time)
npm install
```

---

## Run All Services

```bash
npm run dev
```

All 3 services start in a single terminal with color-coded logs.

---

## API Reference

### Product Service — `localhost:3001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| PATCH | `/api/products/:id/stock` | Update stock (internal) |

### Create Product — Request Body

```json
{
  "name": "iPhone 15",
  "price": 999,
  "description": "Apple smartphone",
  "stock": 10
}
```

---

### Cart Service — `localhost:3002`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart/:userId` | Get cart by user |
| DELETE | `/api/cart/:userId/:productId` | Remove item from cart |
| DELETE | `/api/cart/:userId/clear` | Clear cart (internal) |

### Add to Cart — Request Body

```json
{
  "userId": "user123",
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

---

### Order Service — `localhost:3003`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/place` | Place an order |
| GET | `/api/orders/user/:userId` | Get order history |
| GET | `/api/orders/:id` | Get order by ID |

### Place Order — Request Body

```json
{
  "userId": "user123"
}
```

---

## How It Works

### Place Order Flow

```text
POST /api/orders/place
│
├── 1. Fetch cart from Cart Service
├── 2. Reduce stock for each item via Product Service
├── 3. Calculate total amount
├── 4. Save order to DB
└── 5. Clear cart via Cart Service
```

### Add to Cart Flow

```text
POST /api/cart/add
│
├── 1. Validate product exists via Product Service
├── 2. Snapshot name + price from product
└── 3. Save to cart (create or update)
```

---

## Key Design Decisions

- **No API Gateway** — services communicate directly, keeps it simple
- **Price snapshot in cart** — cart stores price at time of adding, not live price
- **Stock validation on order** — stock reduces only when order is placed, not on add to cart
- **Single env + package.json** — monorepo style without extra tooling complexity
- **`__dirname` for env path** — ensures `.env` resolves correctly regardless of where `node` is run from

---

## Concepts Covered

- Microservices architecture
- Multiple entities (Product, Cart, Order)
- Inter-service HTTP communication
- MongoDB with Mongoose
- RESTful API design
- Stock management after order
- Order history per user

---

## Author

**Aman Sharma**

- Gmail: amanshonak16@gmail.com

#gowaiacademy #rftinternship