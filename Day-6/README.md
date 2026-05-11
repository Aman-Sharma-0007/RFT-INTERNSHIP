# 🎓 Student Management API — Microservice Architecture

> Day 6 Project | GOW AI Academy Backend Internship

---

## 📌 Project Overview

A fully functional **Student Management REST API** built using **Microservice Architecture**.
Each service runs independently on its own port and communicates via HTTP using Axios.
Student data is stored in **MongoDB Atlas** using Mongoose.

GitHub Repository: (https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/tree/main)

---

## 🏗️ Architecture

```
Client / Postman
        ↓
  ┌─────────────────────┐
  │   API Gateway       │  Port 6000
  └─────────────────────┘
        ↓
  ┌─────────────────────────────────────────────┐
  │                                             │
  ▼                   ▼                         ▼
┌──────────────┐  ┌──────────────┐   ┌──────────────────┐
│   validate   │  │   idguard    │   │ student-service  │
│   service    │  │   service    │   │                  │
│  Port 6002   │  │  Port 6003   │   │   Port 6001      │
│              │  │              │   │                  │
│ checks       │  │ checks       │   │  CRUD operations │
│ missing      │  │ duplicate    │   │       ↓          │
│ fields       │  │ studentId    │   │   MongoDB Atlas  │
└──────────────┘  └──────────────┘   └──────────────────┘
```

**POST /students flow:**
```
Client → Gateway → validate-service → idguard-service → student-service → MongoDB
```

**GET / PUT / DELETE flow:**
```
Client → Gateway → student-service → MongoDB
```

---

## 📁 Folder Structure

```
student-management-api/
│
├── 📄 package.json               ← single package.json for all services
├── 📄 .env                       ← single env file for all services
│
├── 📂 api-gateway/
│   ├── gateway.js                ← routes + proxies all requests
│   └── server.js                 ← starts on PORT 3000
│
├── 📂 student-service/
│   ├── db.js                     ← MongoDB connection
│   ├── student.model.js          ← Mongoose schema
│   ├── student.controller.js     ← CRUD logic
│   ├── student.routes.js         ← route definitions
│   ├── app.js                    ← express setup
│   └── server.js                 ← starts on PORT 3001
│
├── 📂 validate-service/
│   ├── validate.controller.js    ← missing fields check
│   ├── validate.routes.js
│   ├── app.js
│   └── server.js                 ← starts on PORT 3002
│
└── 📂 idguard-service/
    ├── idguard.controller.js     ← duplicate ID check via MongoDB
    ├── idguard.routes.js
    ├── app.js
    └── server.js                 ← starts on PORT 3003
```

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework for each service |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Axios | HTTP communication between services |
| dotenv | Environment variable management |
| concurrently | Run all services with one command |

---

## 💡 Concepts Covered

- ✅ Microservice Architecture
- ✅ REST API Design
- ✅ Full CRUD Operations
- ✅ MongoDB Atlas + Mongoose
- ✅ Route Design with Express Router
- ✅ Middleware — validation + duplicate check
- ✅ Inter-service communication via Axios
- ✅ Centralized API Gateway
- ✅ Environment variables with dotenv
- ✅ Monorepo with single package.json

---

## 👨‍💻 Author

**Aman Sharma**
- GitHub: [@Aman-Sharma-0007](https://github.com/Aman-Sharma-0007)


---
`#rftinternship` `#nodejs` `#expressjs` `#mongodb` `#microservices`