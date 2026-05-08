# 🚀 Day 5 — API Tester Project (Microservice Architecture)

> An API Tester Project with services of creating users, greeting hello,performing calculations and enerating quotes-  Ruhil Future Technologies — Backend Internship

---

## 📐 Architecture
Request → Gateway (5000)
              ↓
    ┌─────────────────┐
    │   Proxy Router  │
    └─────────────────┘
    ↙         ↙        ↙       ↙
  /hello  /calculate  /users  /quote
  (5001)    (5002)    (5003)  (5004)

## 📁 Folder Structure
day5-api-tester/
│
├── services/
│   ├── hello-service/
│   │   ├── hello.routes.js
│   │   ├── hello.service.js
│   │   └── index.js
│   │
│   ├── calculate-service/
│   │   ├── calculate.routes.js
│   │   ├── calculate.service.js
│   │   └── index.js
│   │
│   ├── users-service/
│   │   ├── user.routes.js
│   │   ├── user.service.js
│   │   └── index.js
│   │
│   └── quote-service/
│       ├── quote.routes.js
│       ├── quote.service.js
│       └── index.js
│
├── middleware/
│   └── logger.js
│
├── gateway.js
├── .env
├── package.json
└── README.md


 ## Features
Multiple API routes
Organized endpoint structure
Basic calculator API
User data API
Random quote API
Logging request details
Error handling responses
Testable using Postman or Browser

## 🛠️ Technologies Used
Node.js
Express.js
Postman


## 📂 API Endpoints
PORT : http://localhost:5000
1️⃣ Hello Route
Endpoint
GET /hello
Response
{
  "message": "Hello, Welcome to the API Tester Project!"
}
2️⃣ Calculator Route
Endpoint
GET /calculate?num1=10&num2=5&operation=add
Supported Operations
add
subtract
multiply
divide
Example Response
{
  "result": 15
}
3️⃣ Users Route
Endpoint
GET /users
Example Response
[
  {
    "id": 1,
    "name": "Aman"
  },
  {
    "id": 2,
    "name": "Rahul"
  }
]
4️⃣ Quote Route
Endpoint
GET /quote
Example Response
{
  "quote": "Success comes from consistency."
}
⭐ Bonus Features
✅ Request Logging

Logs request details in the console:

GET /hello
GET /users
✅ Error Handling

Example error response:

{
  "error": "Invalid operation"
}

## ▶️ How to Run the Project
1. Clone Repository
git clone <your-repository-link>
2. Install Dependencies
npm install
3. Start Server
node gateway.js

or

nodemon gateway.js
🌐 Server Runs On
http://localhost:3000


## 🧪 Testing

You can test APIs using:
Postman
Browser
Thunder Client

## 🎯 Learning Outcomes
Understanding API routing
Organizing backend structure
Handling query parameters
Sending JSON responses
Implementing logging
Basic error handling

## 👨‍💻 Author
Name :AMAN SHARMA
Github=(https://github.com/Aman-Sharma-0007)