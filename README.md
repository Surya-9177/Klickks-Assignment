Authentication System (React + Node.js + SQLite + JWT)
Overview

This project is a simple authentication system built with:

Frontend: React.js

Backend: Node.js + Express.js

Database: SQLite

Authentication: JWT (JSON Web Tokens)

It allows users to register, login, view their profile, and logout securely.

Features

User registration with hashed password (bcrypt)

User login with JWT authentication

Protected profile page (accessible only with a valid token)

Logout by clearing JWT token from cookies

Validation for empty fields

SQLite database for user persistence

LocalStorage for storing user details on the frontend

Responsive UI using Bootstrap

Folder Structure
klickksAssignment/
│── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── profile.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── database/
│       └── users.db
│
│── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Welcome/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── Profile/
│   │   └── index.js
│   └── package.json
│
└── README.md

Installation & Setup
1. Clone the repository
git clone <repo-url>
cd klickksAssignment

2. Backend Setup
cd backend
npm install
node server.js


Backend runs on http://localhost:8000

3. Frontend Setup
cd frontend
npm install
npm start


Frontend runs on http://localhost:3000

API Endpoints
Register User
POST /register/


Body:

{
  "username": "testuser",
  "password": "mypassword"
}

Login User
POST /login/


Body:

{
  "username": "testuser",
  "password": "mypassword"
}


Response:

{
  "jwtToken": "your_jwt_token_here"
}

Get Profile (Protected)
GET /profile/
Headers: Authorization: Bearer <jwt_token>