import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Dashboard/Home';
import Login from './components/Dashboard/Login';
import Signup from './components/Dashboard/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AgentJoin from './components/Agent/AgentJoin';
import ChatApp from './components/Chat/ChatApp';
import ChatHistory from './components/Chat/ChatHistory';
import AgentDashboard from './components/Agent/AgentDashboard';
import AgentWindow from './components/Agent/AgentWindow'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route - user must be logged in */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          } />

          <Route path="/agent" element={
            <ProtectedRoute>
              <AgentJoin />
            </ProtectedRoute>
          } />
          <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <ChatHistory userId={JSON.parse(localStorage.getItem("user"))?.id} />
                  </ProtectedRoute>
                }/>
          <Route
                path="/chat/:sessionId" //for loading history
                element={
                    <ProtectedRoute>
                        <ChatApp />
                    </ProtectedRoute>
                }/>
          <Route
                path="/agent-dashboard"
                element={
                  <ProtectedRoute>
                    <AgentDashboard />
                  </ProtectedRoute>
                }/>
                    
          <Route
                path="/agent-chat/:sessionId"
                element={
                  <ProtectedRoute>
                    <AgentWindow/>
                  </ProtectedRoute>
            }/>
        </Routes>
      </div>
    </Router>
  );
}

export default React.memo(App);
