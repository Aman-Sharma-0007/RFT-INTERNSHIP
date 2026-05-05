📌 Blog System with Users (Backend Internship - Day 2)
🚀 Project Overview

This project is part of the Backend Internship - Day 2.
The goal is to build a Blog System with Users, focusing on handling relationships between multiple entities like users and posts.

🎯 Objectives
Understand relationships between entities
Build a multi-entity backend system
Implement CRUD operations with proper data linking


🛠️ Tech Stack
Node.js
Express.js
MongoDB
Mongoose


📂 Features
✅ Core Features
👤 Create Users
📝 Create Posts
🔗 Link Posts to Users
🔍 Data Fetching
📄 Fetch all posts
👨‍💻 Fetch posts by a specific user
⭐ Bonus Features
💬 Add Comments System
✏️ Edit/Delete posts (only by owner)


🔗 Data Relationships
One User → Many Posts
Each post is linked to a specific user using references (User ID)
📌 API Endpoints (Sample)
👤 User Routes
POST /users → Create a new user
GET /users → Get all users
📝 Post Routes
POST /posts → Create a post
GET /posts → Get all posts
GET /posts/user/:userId → Get posts by user


📁 Folder Structure
project-root/
│── models/
│   ├── User.js
│   └── Post.js
│
│── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
│
│── controllers/
│   ├── userController.js
│   └── postController.js
│
│── middleware/
│   ├── protect.js      
│     
│── config/
│   └── db.js
│
│── server.js
│── package.json


▶️ How to Run
Clone the repository
git clone <your-repo-link>
Install dependencies
npm install
Start server
npm start
Server will run on:
http://localhost:3000


📅 Internship Rules Followed
✅ Daily coding completion
✅ Daily GitHub commits
✅ LinkedIn progress sharing
✅ Timely submission


📈 Learning Outcomes
Learned how to design backend systems with relationships
Gained hands-on experience with MongoDB & Mongoose
Understood API structuring and data linking


📌 Future Improvements
Add authentication (JWT)
Improve validation
Add pagination & search
Deploy the project


🙌 Acknowledgment

This project is part of the Backend Internship program focused on real-world backend development.