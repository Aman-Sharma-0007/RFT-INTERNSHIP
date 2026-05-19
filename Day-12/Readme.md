# 📝 Blog API — Microservice Architecture

> Backend Internship Project | Node.js + Express + MongoDB + Axios

---

## 📌 Project Overview

This project demonstrates a simple **Microservice Architecture** using:

- **API Gateway**
- **Post Service**
- **MongoDB**
- **Axios Communication**
- **Express.js**
- **Mongoose**

The API Gateway forwards all client requests to the Post Service using Axios.

---

# 🏗️ Architecture

```text
Client (Postman / Frontend)
        │
        ▼
API Gateway :3000
        │
      Axios
        ▼
Post Service :3001
        │
    Mongoose
        ▼
     MongoDB
```

---

# 📂 Folder Structure

```text
blog-post/
│
├── api-gateway/
│   └── src/
│       └── index.js
│
├── post-service/
│   └── src/
│       ├── models/
│       │   └── Post.js
│       │
│       ├── controllers/
│       │   └── postController.js
│       │
│       ├── routes/
│       │   └── postRoutes.js
│       │
│       └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Backend Runtime |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Axios | Service-to-Service Communication |
| dotenv | Environment Variables |
| concurrently | Run Multiple Services |

---

# 🚀 Installation & Setup

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Start All Services

```bash
npm run dev
```

---


# 🧪 API Endpoints

## Base URL

```text
http://localhost:3000
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create a Post |
| GET | `/api/posts` | Get All Posts |
| GET | `/api/posts/:id` | Get Single Post |
| PUT | `/api/posts/:id` | Update Post |
| DELETE | `/api/posts/:id` | Delete Post |

---

# 📥 Request Body

## POST / PUT

```json
{
  "title": "MY BLOG",
  "content": "HELLO WORLD"
}
```

---

# ✅ Success Response

```json
{
  "success": true,
  "message": "Post created",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "MY BLOG",
    "content": "HELLO WORLD",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

# 🔑 Key Concepts

| Concept | Description |
|---------|-------------|
| Microservices | Independent services running on different ports |
| API Gateway | Central entry point for requests |
| Axios | Handles inter-service communication |
| Mongoose | MongoDB object modeling |
| dotenv | Environment variable management |
| concurrently | Runs multiple services together |
| Timestamps | Automatically managed by Mongoose |

---

# ▶️ Example Workflow

```text
Client Request
      │
      ▼
API Gateway Receives Request
      │
      ▼
Axios Forwards Request
      │
      ▼
Post Service Handles Logic
      │
      ▼
MongoDB Stores/Retrieves Data
      │
      ▼
Response Returned to Client
```

---

# 📌 Git Commands

```bash
git init
git add .
git commit -m "Day 12: Blog API - Microservice Architecture"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

---



```text
#gowaiacademy #rftinternship #day12 #nodejs #mongodb #microservices #backenddevelopment #expressjs
```