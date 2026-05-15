# 📝 Notes API — Mini System

> **Day 10 Project** | GOW AI Academy — Backend Internship  
> A microservices-based Notes REST API with an API Gateway and a dedicated Notes Service.

---

## 🏗️ Architecture

```
Client (Postman / Browser)
        │
        ▼
┌───────────────────┐
│   API Gateway     │  ← Port 2000
│   (axios proxy)   │
└────────┬──────────┘
         │ forwards requests via axios
         ▼
┌───────────────────┐
│  Notes Service    │  ← Port 2001
│  (CRUD + logic)   │
└────────┬──────────┘
         │
         ▼
   In-Memory Store []
```

All client requests go through **port 2000 only**. The Notes Service on port 2001 is an internal service.

---

## 📁 Folder Structure

```
notes-api/
├── gateway/                        ← API Gateway (port 2000)
│   ├── src/
│   │   └── index.js                ← Axios-based request forwarder
│   ├── .env                        ← PORT, NOTES_SERVICE_URL
│   └── package.json
│
├── services/
│   └── notes-service/              ← Notes Microservice (port 2001)
│       ├── src/
│       │   ├── routes/
│       │   │   └── notes.routes.js     ← URL definitions
│       │   ├── controllers/
│       │   │   └── notes.controller.js ← Request/Response handling
│       │   ├── services/
│       │   │   └── notes.service.js    ← Business logic (pure functions)
│       │   └── index.js                ← Service entry point
│       ├── .env                        ← PORT
│       └── package.json
│
└── .gitignore
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/rftinternship.git
cd rftinternship/day10/notes-api
```

### 2. Install dependencies

```bash
# Gateway
cd gateway
npm install

# Notes Service
cd ../services/notes-service
npm install
```

### 3. Configure environment variables

**`gateway/.env`**
```
PORT=2000
NOTES_SERVICE_URL=http://localhost:2001
```

**`services/notes-service/.env`**
```
PORT=2001
```

---

## 🚀 Running the Project

Open **two terminals**:

**Terminal 1 — Start Notes Service:**
```bash
cd services/notes-service
node src/index.js
# ✅ Notes Service running on port 2001
```

**Terminal 2 — Start API Gateway:**
```bash
cd gateway
node src/index.js
# ✅ API Gateway running on port 2000
```

---

## 📌 Note Data Structure

```json
{
  "id": 1,
  "title": "Meeting",
  "content": "Discuss Project"
}
```

---

## 🔌 API Endpoints

All requests are made to the **Gateway on port 2000**.

| Method   | Endpoint            | Description          |
|----------|---------------------|----------------------|
| `GET`    | `/notes`            | Get all notes        |
| `POST`   | `/notes`            | Add a new note       |
| `PUT`    | `/notes/:id`        | Update a note by ID  |
| `DELETE` | `/notes/:id`        | Delete a note by ID  |
| `GET`    | `/notes?search=kw`  | Search notes         |
| `GET`    | `/notes?sortBy=title` | Sort notes by title |
| `GET`    | `/health`           | Gateway health check |

---

## 🧪 Testing with Postman

### ✅ Health Check
```
GET http://localhost:2000/health
```
```json
{ "status": "Gateway Running" }
```

---

### ➕ Add a Note
```
POST http://localhost:2000/notes
Content-Type: application/json
```
```json
{
  "title": "Meeting",
  "content": "Discuss Project"
}
```
**Response `201`:**
```json
{
  "success": true,
  "data": { "id": 1, "title": "Meeting", "content": "Discuss Project" }
}
```

---

### 📋 Get All Notes
```
GET http://localhost:2000/notes
```
**Response `200`:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Meeting", "content": "Discuss Project" },
    { "id": 2, "title": "Grocery List", "content": "Buy milk and eggs" }
  ]
}
```

---

### ✏️ Update a Note
```
PUT http://localhost:2000/notes/1
Content-Type: application/json
```
```json
{
  "title": "Updated Meeting",
  "content": "Discuss Project + Budget"
}
```
**Response `200`:**
```json
{
  "success": true,
  "data": { "id": 1, "title": "Updated Meeting", "content": "Discuss Project + Budget" }
}
```

---

### 🗑️ Delete a Note
```
DELETE http://localhost:2000/notes/1
```
**Response `200`:**
```json
{
  "success": true,
  "message": "Note deleted",
  "data": { "id": 1, "title": "Meeting", "content": "Discuss Project" }
}
```

---

### 🔍 Search Notes (Bonus)
```
GET http://localhost:2000/notes?search=meeting
```
Returns all notes where title or content contains the keyword.

---

### 🔤 Sort Notes (Bonus)
```
GET http://localhost:2000/notes?sortBy=title
```
Returns notes sorted alphabetically by title.

---

## ❌ Validation & Error Handling

| Scenario              | Status | Message                          |
|-----------------------|--------|----------------------------------|
| Missing title/content | `400`  | `Title and content are required` |
| Note ID not found     | `404`  | `Note not found`                 |
| No update fields sent | `400`  | `Provide title or content to update` |
| Gateway/network error | `500`  | `Gateway Error: <message>`       |

---

## 🧠 Concepts Covered

- ✅ **Microservices Architecture** — Gateway + Service separation
- ✅ **CRUD Operations** — Create, Read, Update, Delete
- ✅ **Input Validation** — Request body validation with meaningful errors
- ✅ **Axios Proxy** — Gateway forwards requests using axios
- ✅ **Express Routing** — Clean route → controller → service layering
- ✅ **In-Memory Storage** — Array-based data store with auto-increment ID
- ✅ **Bonus: Search** — Keyword filter across title and content
- ✅ **Bonus: Sort** — Sort notes by title or ID
- ✅ **System-Like Thinking** — Separation of concerns across layers

---

## 🛠️ Tech Stack

| Technology | Purpose              |
|------------|----------------------|
| Node.js    | Runtime              |
| Express.js | HTTP Server/Router   |
| Axios      | HTTP forwarding in Gateway |
| dotenv     | Environment variables |

---


---

## 👨‍💻 Author

**AMAN SHARMA**  
GOW AI Academy — Backend Internship, Day 10  
📧 kuk@gyansetu.ai | 📞 7082101403