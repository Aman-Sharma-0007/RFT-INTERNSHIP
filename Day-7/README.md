# 📝 To-Do API ADVANCED — Day 7 (Advanced Microservice Architecture)

> Ruhil Future Technologies Backend Internship — Day 7 Project

---

## 🏗️ Architecture

This project follows a **Microservice Architecture** where each responsibility is handled by a separate service.

Client (Postman)
        │
        ▼
┌─────────────────┐
│   API Gateway   │  :1000
└────────┬────────┘
         │
         ├── GET /tasks ──────────────────▶ ┌──────────────────┐
         │                                   │   Task Service   │ :1001
         ├── POST /tasks ───────────────────▶│                  │
         │                                   │ • GET all tasks  │
         ├── DELETE /tasks/:id ─────────────▶│ • POST new task  │
         │                                   │ • DELETE task    │
         │                                   └────────┬─────────┘
         │                                            │
         ├── PATCH /tasks/:id ────────────▶ ┌─────────┴────────┐
         │                                  │  Status Service  │ :1002
         │                                  │                  │
         │                                  │ • PATCH          │
         │                                  │   completed:true │
         │                                  └────────┬─────────┘
         │                                           │
         └── GET /tasks?status= ──────────▶ ┌────────┴─────────┐
                                            │  Filter Service  │ :1003
                                            │                  │
                                            │ • ?status=       │
                                            │   completed      │
                                            │ • ?status=       │
                                            │   pending        │
                                            └────────┬─────────┘
                                                     │
                              ┌──────────────────────┘
                              │
                              ▼
                ┌─────────────────────────┐
                │         MongoDB         │
                │   localhost:27017       │
                │                        │
                │  db: todo-microservice  │
                │  collection: tasks      │
                │                        │
                │  { _id, title,         │
                │    completed,          │
                │    createdAt,          │
                │    updatedAt }         │
                └─────────────────────────┘


---

## 📁 Folder Structure

todo-microservice/
├── package.json
├── .env
├── shared/
│   ├── db.js
│   ├── task.model.js
│   └── errorHandler.js
├── api-gateway/
│   └── index.js
├── task-service/
│   ├── index.js
│   ├── task.routes.js
│   └── task.controller.js
├── status-service/
│   ├── index.js
│   ├── status.routes.js
│   └── status.controller.js
└── filter-service/
    ├── index.js
    ├── filter.routes.js
    └── filter.controller.js


---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Compass (connected to localhost:27017)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Aman-Sharma-0007/todo-microservice.git
cd todo-microservice

# 2. Install dependencies
npm install

# 3. Start MongoDB Compass and connect to localhost:27017

# 4. Run all services
npm run dev
```

---

---

## 📡 API Endpoints

> All requests go through the **API Gateway on port 1000**

### Task Service

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/tasks` | Get all tasks | — |
| POST | `/tasks` | Create a task | `{ "title": "string" }` |
| DELETE | `/tasks/:id` | Delete a task | — |

### Status Service

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| PATCH | `/tasks/:id` | Mark complete/pending | `{ "completed": true }` |

### Filter Service (Bonus)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks?status=completed` | Get completed tasks |
| GET | `/tasks?status=pending` | Get pending tasks |

---
---

## 🧩 Concepts Covered

| Concept | Where |
|---------|-------|
| Microservice Architecture | 4 separate services with single gateway |
| State Management (Backend) | MongoDB persists all task state |
| Partial Updates | `PATCH` + `findByIdAndUpdate` with only `{ completed }` |
| Updating Specific Fields | `{ ...task, ...fields }` pattern in status service |
| Filter by Query Params | `?status=completed` handled by filter service |
| Centralized Error Handling | `shared/errorHandler.js` used across all services |
| Shared Model | `shared/task.model.js` single Mongoose schema |

---

## 📦 Task Structure (MongoDB Document)

```json
{
  "_id": "664abc123def456...",
  "title": "Learn Backend",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🛠️ Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB + Mongoose
- **Gateway** — http-proxy-middleware
- **Dev Tool** — concurrently (run all services with one command)

---

## 👨‍💻 Author

**Yogender** — GOW AI Academy Backend Internship
- GitHub: (https://github.com/Aman-Sharma-0007)


#gowaiacademy #rftinternship

