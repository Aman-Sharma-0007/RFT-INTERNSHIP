# 🎓 Student API with MongoDB — Microservice Architecture

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

> Production-style REST API built using Microservice Architecture with Node.js, Express.js, MongoDB, Axios, and Postman.

---

# 📌 Project Overview

This project is a backend microservice-based Student Management API.

The application is divided into two independent services:

- API Gateway
- Student Service

The API Gateway acts as the single entry point for clients and forwards requests using Axios.

The Student Service handles:
- Business logic
- CRUD operations
- MongoDB database operations
- Validation
- Error handling

---

# 🏗️ Architecture

```text
Client / Postman
       │
       ▼
┌────────────────────┐
│    API Gateway     │
│    Port : 3000     │
│   Express + Axios  │
└─────────┬──────────┘
          │ HTTP Request
          ▼
┌────────────────────┐
│   Student Service  │
│    Port : 5001     │
│ Express + MongoDB  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      MongoDB       │
│    studentdb       │
└────────────────────┘
```

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| Axios | Service communication |
| dotenv | Environment variables |
| Postman | API testing |

---

# 📁 Folder Structure

```text
student-api/
│
├── api-gateway/
│   ├── src/
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
├── student-service/
│   ├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── studentController.js
│   │
│   ├── models/
│   │   └── studentModel.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   └── index.js
│
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🚀 Getting Started

# Step 1 — Clone Repository

```bash
git clone https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/Day-11/student-api

cd student-api
```

---

# Step 2 — Install Dependencies

## Install API Gateway dependencies

```bash
cd api-gateway

npm install
```

---

## Install Student Service dependencies

```bash
cd ../student-service

npm install
```

---

# Step 3 — Start MongoDB

```bash
mongod
```

---

# Step 4 — Run Student Service

```bash
cd student-service

node src/index.js
```

Expected Output:

```bash
MongoDB connected
Student Service running on port 5001
```

---

# Step 5 — Run API Gateway

```bash
cd api-gateway

node src/index.js
```

Expected Output:

```bash
API Gateway running on port 3000
```

---

# 🌐 Base URLs

## API Gateway

```text
http://localhost:3000
```

## Student Service

```text
http://localhost:5001
```

---

# ❤️ Health Check APIs

## API Gateway Health

```http
GET http://localhost:3000/health
```

Response:

```json
{
  "status": "api-gateway running"
}
```

---

## Student Service Health

```http
GET http://localhost:5001/health
```

Response:

```json
{
  "status": "student-service running"
}
```

---

# 📡 API Endpoints

# Base URL

```text
http://localhost:3000
```

---

# 1️⃣ Add Student

## Request

```http
POST /api/students
```

## Full URL

```text
http://localhost:3000/api/students
```

## Headers

```http
Content-Type: application/json
```

## Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "age": 21,
  "course": "Backend Development"
}
```

## Success Response

```json
{
  "message": "Student created",
  "data": {
    "_id": "664f1b2c9a4e2d001f3c8a99",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "age": 21,
    "course": "Backend Development"
  }
}
```

---

# 2️⃣ Get All Students

## Request

```http
GET /api/students?page=1&limit=5
```

## Full URL

```text
http://localhost:3000/api/students?page=1&limit=5
```

## Success Response

```json
{
  "page": 1,
  "totalPages": 1,
  "totalStudents": 1,
  "data": []
}
```

---

# 3️⃣ Get Student By ID

## Request

```http
GET /api/students/:id
```

## Full URL

```text
http://localhost:3000/api/students/{{student_id}}
```

## Success Response

```json
{
  "data": {
    "_id": "664f1b2c9a4e2d001f3c8a99",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "age": 21,
    "course": "Backend Development"
  }
}
```

---

# 4️⃣ Update Student

## Request

```http
PUT /api/students/:id
```

## Full URL

```text
http://localhost:3000/api/students/{{student_id}}
```

## Body

```json
{
  "age": 23,
  "course": "Full Stack Development"
}
```

## Success Response

```json
{
  "message": "Student updated",
  "data": {
    "_id": "664f1b2c9a4e2d001f3c8a99",
    "age": 23,
    "course": "Full Stack Development"
  }
}
```

---

# 5️⃣ Delete Student

## Request

```http
DELETE /api/students/:id
```

## Full URL

```text
http://localhost:3000/api/students/{{student_id}}
```

## Success Response

```json
{
  "message": "Student deleted successfully"
}
```

---

# ⚠️ Error Handling

# Missing Fields

```json
{
  "error": "Missing required fields: name, email, age, course"
}
```

---

# Invalid MongoDB ID

```json
{
  "error": "Invalid student ID format"
}
```

---

# Duplicate Email

```json
{
  "error": "Email already exists"
}
```

---

# Student Not Found

```json
{
  "error": "Student not found"
}
```

---

# Service Unavailable

```json
{
  "error": "Student service unavailable"
}
```

---

# 🧪 Postman Testing

# Create Environment

| Variable | Value |
|----------|-------|
| base_url | http://localhost:3000 |
| student_id | leave blank |

---

# Example URL

```text
{{base_url}}/api/students
```

---

# Postman Test Cases

| Test Case | Expected Status |
|-----------|----------------|
| Add Student | 201 |
| Get Students | 200 |
| Get Student By ID | 200 |
| Update Student | 200 |
| Delete Student | 200 |
| Missing Fields | 400 |
| Invalid ID | 400 |
| Duplicate Email | 400 |
| Student Not Found | 404 |

---

# 📚 Key Learnings

- Microservice Architecture
- API Gateway Pattern
- MongoDB Integration
- Axios Communication
- Mongoose Validation
- Pagination
- REST APIs
- Postman Testing
- Error Handling

---

# 👨‍💻 Author

## Aman Sharma

Backend Developer

GitHub:
https://github.com/Aman-Sharma-0007



Email:
amanshonak16@gmail.com

---

# 🏷️ Tags

```text
#nodejs
#expressjs
#mongodb
#mongoose
#microservices
#backenddevelopment
#restapi
#axios
#postman
```