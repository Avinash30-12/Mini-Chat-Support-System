# ChatSystem

A real-time chat application with agent and user support, built using **React (Vite)** on the frontend and **Node.js + Express + Socket.IO** on the backend.

## 🚀 Features
- Real-time communication with WebSockets (Socket.IO)
- User authentication (signup & login)
- Agent dashboard to manage chats
- Chat history storage
- Modular frontend with reusable components
- Centralized API and socket services
- Logging and error handling in backend

## 🛠️ Tech Stack
### Frontend
- React (Vite)
- React Router
- Socket.IO client

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB (via Mongoose)
- Winston (logging middleware)

## 📂 Project Structure
```
ChatSystem/
├── frontend/        # React + Vite frontend
│   ├── public/      # Static files
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/       # Chat-related components
│   │   │   ├── Agent/      # Agent-related components
│   │   │   └── Dashboard/  # User auth & dashboard
│   │   ├── services/       # API & socket utilities
│   │   ├── assets/         # Images/icons
│   │   ├── app.jsx         # Main app logic
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/         # Node.js + Express + Socket.IO backend
│   ├── controllers/ # Request controllers
│   ├── routes/      # Express routes
│   ├── models/      # Mongoose models
│   ├── utils/       # Helper utilities (agentManager, socketHandler)
│   ├── middleware/  # Logger & error handling
│   ├── logs/        # Log files
│   ├── app.js       # Express app setup
│   ├── server.js    # Entry point
│   ├── .env         # Environment variables
│   └── package.json
```

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <repo-url>
cd ChatSystem
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env   # update MongoDB URI, port, etc.
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## ▶️ Running the Project
- Backend will run on: `http://localhost:5000` (default, configurable in `.env`)
- Frontend will run on: `http://localhost:5173` (Vite default)

## 🔮 Future Improvements
- JWT authentication
- Deployment guide (Docker / cloud hosting)
- UI/UX enhancements
- Chat analytics for agents

