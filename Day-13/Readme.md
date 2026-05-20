# 🔐 Full Authentication System

> A secure REST API backend built with Node.js, Express, JWT, and MongoDB — Day 1 of Ruhil Future Technologies Backend Internship.

---

# ✨ Features

- User Registration
- Secure Login System
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes Middleware
- MongoDB Integration
- Environment Variable Security
- REST API Architecture

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| bcryptjs | Password hashing |
| JSON Web Token (JWT) | Authentication tokens |
| dotenv | Environment variables |
| validator | Email validation |

---

## 📁 Project Structure

```bash
auth-system/
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aman-Sharma-0007/RFT-INTERNSHIP/tree/main/Day-13
cd User-Authentication
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
JWT_SECRET=mysecretkey123
JWT_EXPIRES_IN=1d
MONGO_URI=mongodb://localhost:27017/authsystem
```

### 4. Start MongoDB

Using MongoDB Compass or local MongoDB service.

### 5. Run the server

```bash
npx nodemon server.js
```

✅ Server running at:

```bash
http://localhost:3000
```

---

# 📌 API Endpoints

## 🟢 POST `/api/register`

Register a new user.

### Request Body

```json
{
  "username": "AmanSharma",
  "email": "aman@gmail.com",
  "password": "India@123"
}
```

### Response

```json
{
  "message": "Registered successfully!"
}
```

---

## 🟡 POST `/api/login`

Login user and generate JWT token.

### Request Body

```json
{
  "email": "aman@gmail.com",
  "password": "India@123"
}
```

### Response

```json
{
  "message": "Login successful!",
  "token": "your_jwt_token_here"
}
```

---

## 🔵 GET `/api/profile`

Protected route to access user profile.

### Headers

```bash
Authorization: Bearer <your_token_here>
```

### Response

```json
{
  "message": "Welcome AmanSharma to your profile!",
  "user": {
    "username": "AmanSharma",
    "email": "aman@gmail.com"
  }
}
```

---

# 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcryptjs with salt rounds of 10 |
| JWT Authentication | Token-based auth with expiry |
| Protected Routes | Middleware verification |
| Email Validation | Regex + validator package |
| Unique Email | MongoDB unique index |
| Error Handling | Try/catch with proper status codes |

---

# 📡 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# 🧪 Testing

Test all APIs using Thunder Client or Postman.

| Test | Method | Endpoint | Auth Required |
|------|--------|----------|--------------|
| Register user | POST | `/api/register` | ❌ |
| Login user | POST | `/api/login` | ❌ |
| View profile | GET | `/api/profile` | ✅ |
| Invalid email | POST | `/api/register` | ❌ |
| Wrong password | POST | `/api/login` | ❌ |
| No token | GET | `/api/profile` | ❌ |

---

# ✅ Validation Rules

- Username → Required
- Email → Required, unique, valid format
- Password → Required, minimum 4 characters

---

# 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| JWT_SECRET | Secret key for JWT | mysecretkey123 |
| JWT_EXPIRES_IN | Token expiry time | 7d |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/authsystem |

---

# 📸 API Flow

```bash
Client
  │
  ├── POST /register
  │        │
  │        ├── Validate Input
  │        ├── Hash Password
  │        └── Save User in MongoDB
  │
  ├── POST /login
  │        │
  │        ├── Validate Credentials
  │        ├── Compare Password
  │        └── Generate JWT Token
  │
  └── GET /profile
           │
           ├── Verify JWT Token
           └── Return User Data
```

---

# 👨‍💻 Author

**Aman Sharma**

- GitHub: https://github.com/Aman-Sharma-0007


---

# 🏫 Internship Details

| Detail | Info |
|--------|------|
| Program | GOW AI Academy Backend Internship |
| Day | Day 13 |
| Project | Full Authentication System |
| Hashtags | #gowaiacademy #rftinternship |

---

# 📝 License

This project is open source and available under the MIT License.