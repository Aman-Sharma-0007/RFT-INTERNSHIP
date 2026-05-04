# 🔐 Full Authentication System

> A secure REST API backend built with Node.js, Express, JWT, and MongoDB — Day 1 of Ruhil Future Technologies Backend Internship.

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

```
auth-system/
├── middleware/
│   └── authMiddleware.js    # JWT token verification
├── models/
│   └── User.js              # MongoDB user schema
├── routes/
│   └── authRoutes.js        # Register, Login, Profile routes
├── .env                     # Environment variables (not pushed)
├── .gitignore
├── package.json
└── server.js                # Entry point
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/auth-system.git
cd auth-system
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

### 4. Start MongoDB (via MongoDB Compass or local service)

### 5. Run the server
```bash
npx nodemon server.js
```

✅ Server running at `http://localhost:3000`

---

## 📌 API Endpoints

### 🟢 POST `/api/register`
Register a new user.

**Request Body:**
```json
{
  "username": "AmanSharma",
  "email": "aman@gmail.com",
  "password": "India@123"
}
```

**Response:**
```json
{
  "message": "Registered successfully!"
}
```

---

### 🟡 POST `/api/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "aman@gmail.com",
  "password": "India@123"
}
```

**Response:**
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔵 GET `/api/profile`
Access protected profile route. Requires JWT token.

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**
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

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcryptjs with salt rounds of 10 |
| JWT Authentication | Token-based auth with expiry |
| Protected Routes | Middleware verification |
| Email Validation | Regex + validator package |
| Unique Email | MongoDB unique index |
| Error Handling | Try/catch with proper status codes |

---

## 🧪 Testing

Test all endpoints using **Thunder Client** or **Postman**:

| Test | Method | Endpoint | Auth Required |
|------|--------|----------|--------------|
| Register user | POST | `/api/register` | ❌ |
| Login user | POST | `/api/login` | ❌ |
| View profile | GET | `/api/profile` | ✅ Bearer Token |
| Invalid email | POST | `/api/register` | ❌ |
| Wrong password | POST | `/api/login` | ❌ |
| No token | GET | `/api/profile` | ❌ |

---

## ✅ Validation Rules

- **Username** → Required, can be duplicate
- **Email** → Required, must be unique, must be valid format
- **Password** → Required, minimum 4 characters

---

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | Secret key for JWT | `mysecretkey123` |
| `JWT_EXPIRES_IN` | Token expiry time | `1d` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/authsystem` |

---

## 📸 API Flow

```
Client
  │
  ├── POST /register ──► Validate ──► Hash Password ──► Save to MongoDB
  │
  ├── POST /login ────► Validate ──► Check Password ──► Return JWT Token
  │
  └── GET /profile ───► Check Token ──► Verify JWT ──► Return User Data
```

---

## 👨‍💻 Author

**Aman Sharma**
- GitHub: [@YourUsername](https://github.com/YourUsername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🏫 Internship Details

| Detail | Info |
|--------|------|
| Program | GOW AI Academy Backend Internship |
| Day | Day 1 |
| Project | Full Authentication System |
| Hashtags | #gowaiacademy #rftinternship |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
