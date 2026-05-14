# Day 9 — Form Validation API with MongoDB

> Backend Internship Project | GOW AI Academy x Ruhil Future Technologies

---

## About the Project

A RESTful Form Validation API built with Node.js, Express, and MongoDB.
It validates user input (name, email, age), returns all errors at once if
validation fails, and saves valid submissions to a MongoDB database.

---

## Concepts Practiced

- Input Validation (name, email, age)
- Defensive Programming (all validators run always)
- Error Aggregation (return ALL errors at once — bonus)
- Microservice Folder Architecture
- MongoDB integration with Mongoose
- REST API design (POST, GET, DELETE)

---

## Tech Stack

| Technology | Purpose               |
|------------|-----------------------|
| Node.js    | Runtime environment   |
| Express.js | Web framework         |
| MongoDB    | Database              |
| Mongoose   | MongoDB ODM           |
| dotenv     | Environment variables |

---

## Folder Structure
form-api/
│
├── src/
│   ├── gateway/
│   │   └── router.js              → API routes
│   ├── services/
│   │   └── validationService.js   → Orchestrator
│   ├── validators/
│   │   ├── nameValidator.js       → Name validation
│   │   ├── emailValidator.js      → Email validation
│   │   └── ageValidator.js        → Age validation
│   ├── aggregator/
│   │   └── errorAggregator.js     → Collects all errors
│   ├── db/
│   │   ├── connection.js          → MongoDB connection
│   │   └── formRepository.js      → DB queries
│   ├── models/
│   │   └── formModel.js           → Mongoose schema
│   └── utils/
│       └── responseBuilder.js     → Response formatting
│
├── .env                           → Environment variables
├── app.js                         → Entry point
├── package.json
└── README.md

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally OR MongoDB Compass account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aman-Sharma-0007/form-validation-api.git

# 2. Go into the project folder
cd form-validation-api

# 3. Install dependencies
npm install

# 4. Create .env file
touch .env
```

### Run the Server

```bash
node app.js
```

---

## API Endpoints

### POST /api/submit

Submit and validate a form. Saves to MongoDB if valid.

**Request Body:**

```json
{
  "name": "Ravi Kumar",
  "email": "ravi@gmail.com",
  "age": 22
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Form submitted successfully!",
  "data": {
    "_id": "664abc123...",
    "name": "Ravi Kumar",
    "email": "ravi@gmail.com",
    "age": 22,
    "createdAt": "2025-05-14T10:00:00.000Z",
    "updatedAt": "2025-05-14T10:00:00.000Z"
  }
}
```

**Validation Error Response (400):**

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Name is required and cannot be empty.",
    "Email must be a valid format (e.g. user@example.com).",
    "Age must be a number between 5 and 100."
  ]
}
```

---

### GET /api/forms

Fetch all submitted forms from the database.

**Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "664abc123...",
      "name": "Ravi Kumar",
      "email": "ravi@gmail.com",
      "age": 22,
      "createdAt": "2025-05-14T10:00:00.000Z"
    }
  ]
}
```

---

### GET /api/forms/:id

Fetch a single form by its MongoDB ID.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "664abc123...",
    "name": "Ravi Kumar",
    "email": "ravi@gmail.com",
    "age": 22
  }
}
```

**Not Found (404):**

```json
{
  "success": false,
  "message": "Form not found."
}
```

---

### DELETE /api/forms/:id

Delete a form by its MongoDB ID.

**Response (200):**

```json
{
  "success": true,
  "message": "Form deleted successfully."
}
```

---

## Validation Rules

| Field | Rule                       |
|-------|----------------------------|
| name  | Required, cannot be empty  |
| email | Must be valid email format |
| age   | Must be a number, 5 to 100 |

---

---

## Key Learnings from Day 9

- How to structure a Node.js project in microservice style
- How to connect MongoDB using Mongoose
- How to validate input defensively (run all checks, not just first failure)
- How to return all errors at once instead of one by one
- How to build clean, consistent API responses

---

## Author

**Aman Sharma**  
GitHub: (https://github.com/Aman-Sharma-0007)  


---

## Hashtags

`#gowaiacademy` `#rftinternship` `#nodejs` `#expressjs` `#mongodb` `#backenddev` `#day9`