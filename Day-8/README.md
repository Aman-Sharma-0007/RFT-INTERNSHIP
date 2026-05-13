# Auth Service — Day 8

A RESTful authentication API built with **Node.js**, **Express**, **MongoDB**, and **JWT**. Covers user registration, login, input validation, password hashing, and token-based authentication.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT generation & verification |
| express-validator | Input validation |
| dotenv | Environment variable management |

---

## Folder Structure

```
auth-service/
├── src/
│   ├── app.js              ← Express setup & middleware
│   ├── authController.js   ← Register & login business logic
│   ├── authRoutes.js       ← Route definitions
│   ├── db.js               ← MongoDB connection
│   ├── User.js             ← Mongoose user schema
│   └── validate.js         ← Input validation rules
├── .env                    ← Environment variables
├── package.json
└── server.js               ← Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/auth-service.git
cd auth-service

# Install dependencies
npm install
```


### Run the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server will start at `http://localhost:7000`

---

## API Endpoints

### POST `/api/auth/register`

Registers a new user.

**Request Body:**
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "secure123"
}
```

**Success Response — `201 Created`:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Ravi Kumar",
    "email": "ravi@example.com"
  }
}
```

---

### POST `/api/auth/login`

Authenticates an existing user.

**Request Body:**
```json
{
  "email": "ravi@example.com",
  "password": "secure123"
}
```

**Success Response — `200 OK`:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Ravi Kumar",
    "email": "ravi@example.com"
  }
}
```

---

## Error Responses

| Status | Reason |
|---|---|
| `401` | Invalid credentials (wrong email or password) |
| `409` | Email already registered |
| `422` | Validation failed (invalid email, short password, missing fields) |
| `500` | Internal server error |

---

## Validation Rules

| Field | Rule |
|---|---|
| `name` | Required, cannot be empty |
| `email` | Must be a valid email format |
| `password` | Minimum 6 characters |

---

## Concepts Covered

- **Input Validation** — using `express-validator` to catch bad data before it hits the database
- **Password Hashing** — `bcryptjs` with salt rounds of 10; plain text passwords are never stored
- **Duplicate Prevention** — unique email constraint enforced at both schema and controller level
- **JWT Authentication** — stateless token signed with a secret, expires in 7 days
- **Proper Error Messages** — login returns the same error for wrong email and wrong password to prevent user enumeration attacks
- **Microservice Structure** — flat `src/` layout with clear separation of routing, logic, schema, and validation

---

## Testing with Postman

Import the following collection or test manually:

1. **Register** — `POST /api/auth/register` with name, email, password
2. **Login** — `POST /api/auth/login` with email, password
3. **Duplicate register** — register same email twice → expect `409`
4. **Invalid email** — send `notanemail` → expect `422`
5. **Short password** — send password under 6 chars → expect `422`
6. **Wrong password** — login with incorrect password → expect `401`

---

## Author

**Aman Sharma**  
Ruhil Future Technology — Backend Internship  
Day 8 Project — Login & Register API (Basic Auth Logic)

GitHub: [github.com/Aman-Sharma-0007](https://github.com/Aman-Sharma-0007)  


---

## Hashtags

`#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#mongodb` `#jwt` `#backend`
