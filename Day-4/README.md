# 📘 Day 4- 🎲 Random Data API 

This project is part of my **Backend Development Internship**.  
In Day4, I built a **Random Data API** that supports users and posts with proper relationships.

---


# 🎲 Random Data API

A **Microservice Architecture** based REST API that returns random quotes, jokes, and facts by fetching data from external APIs through a centralized API Gateway.

---

## 📁 Folder Structure
Random-Data-API/
├── api-gateway/
│   └── index.js              # Gateway - forwards requests to services
├── services/
│   ├── quote-service/
│   │   ├── quote.service.js  # Fetches quote from external API
│   │   ├── quote.route.js    # Defines /quote route
│   │   └── index.js          # Quote service server (port 4000)
│   ├── joke-service/
│   │   ├── joke.service.js   # Fetches joke from external API
│   │   ├── joke.route.js     # Defines /joke route
│   │   └── index.js          # Joke service server (port 4001)
│   └── fact-service/
│       ├── fact.service.js   # Fetches fact from external API
│       ├── fact.route.js     # Defines /fact route
│       └── index.js          # Fact service server (port 4002)
├── .env                      # Global environment variables (not committed)
├── .gitignore
├── package.json              # Single package.json for all services
└── README.md

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Axios | HTTP requests to external APIs |
| dotenv | Environment variable management |
| concurrently | Run all services with single command |
| cross-env | Cross-platform env variable support |
| nodemon | Auto-restart on file changes (dev) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Random-Data-API.git

# Navigate to project
cd Random-Data-API

# Install dependencies
npm install
```

### Run

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

---

## 📡 API Endpoints

### Base URL
http://localhost:4003
| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Check all services status |
| GET | /quote | Get a random quote |
| GET | /joke | Get a random joke |
| GET | /fact | Get a random fact ⭐ |

---

### Health Check
```http
GET /health
```
```json
{
  "success": true,
  "message": "API Gateway is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Get Random Quote
```http
GET /quote
```
```json
{
  "success": true,
  "type": "quote",
  "data": {
    "quote": "Life is what happens when you're busy making other plans.",
    "author": "John Lennon"
  }
}
```

### Get Random Joke
```http
GET /joke
```
```json
{
  "success": true,
  "type": "joke",
  "data": {
    "setup": "Why don't scientists trust atoms?",
    "punchline": "Because they make up everything!",
    "category": "general"
  }
}
```

### Get Random Fact ⭐ Bonus
```http
GET /fact
```
```json
{
  "success": true,
  "type": "fact",
  "data": {
    "fact": "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs.",
    "source": "https://uselessfacts.jsph.pl"
  }
}
```

---

## 🧩 Concepts Covered

- ✅ **Dynamic Response** — Data fetched live from external APIs
- ✅ **Logic Inside API** — Service layer separates business logic
- ✅ **Microservice Architecture** — Each service runs independently
- ✅ **API Gateway Pattern** — Single entry point for all requests
- ✅ **Error Handling** — 500 and 503 errors handled gracefully
- ✅ **Bonus /fact Endpoint** — Extra endpoint with no repetition

---

## 👨‍💻 Author

**Aman Sharma**  
🔗 [GitHub](https://github.com/Aman-Sharma-0007)  


---

## 📌 Tags
 `#rftinternship` `#nodejs` `#microservices` `#expressjs` `#backenddevelopment`