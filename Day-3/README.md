# 📦 User Info API — Day 3 Backend Internship

A simple REST API built with **Node.js** and **Express.js** that stores and retrieves user data using **in-memory storage (Array)**.

Built as part of the **Ruhil Future Technologies Backend Internship** — Day 3 Project.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Storage:** In-Memory (Array)
- **Testing:** Postman

---

## 📁 Folder Structure
user-info-api/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── user.controller.js
│   ├── services/
│   │   └── user.service.js
│   ├── repositories/
│   │   └── user.repository.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── app.js
├── server.js
├── package.json
└── .gitignore


---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/user-info-api.git
cd user-info-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Server
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

### 4️⃣ Server Running At
http://localhost:3001
---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Returns all users |
| GET | `/users/:id` | Returns a specific user by ID |

---

## 🧪 Sample Requests & Responses

### ✅ GET /users
**Request:**
GET http://localhost:3001/users
**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "AMIT" },
    { "id": 2, "name": "RIYA" }
  ]
}
```

---

### ✅ GET /users/:id — User Found
**Request:**
GET http://localhost:3001/users/1
**Response:**
```json
{
  "success": true,
  "data": { "id": 1, "name": "AMIT" }
}
```

---

### ❌ GET /users/:id — User Not Found
**Request:**
GET http://localhost:3001/users/99
**Response:**
```json
{
  "success": false,
  "error": "User with ID 99 not found"
}
```

---

## 🏗️ Architecture

This project follows a **Microservice Layered Architecture:**
Request → Routes → Controller → Service → Repository → Response
| Layer | File | Responsibility |
|-------|------|----------------|
| Route | `user.routes.js` | Maps URLs to controllers |
| Controller | `user.controller.js` | Handles HTTP req/res |
| Service | `user.service.js` | Business logic & error handling |
| Repository | `user.repository.js` | Data access (in-memory array) |
| Middleware | `errorHandler.js` | Global error formatting |

---

## 💡 Concepts Learned

- ✅ REST API design with Express.js
- ✅ In-memory data storage using Arrays
- ✅ GET request handling
- ✅ Microservice layered architecture
- ✅ Global error handling middleware
- ✅ API testing with Postman

---

## 👨‍💻 Author

**Aman Sharma**  
🐙 [GitHub](https://github.com/Aman-Sharma-0007)

---

## 📌 Internship Details

- 🏫 **Program:** Ruhil Future Technologies Backend Internship
- 📅 **Day:** 3
- 🏷️ **Hashtags:** #gowaiacademy #rftinternship

---
