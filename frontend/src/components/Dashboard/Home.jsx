import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // ✅ import external CSS

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Welcome to Chat Support</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {user ? (
        <div className="user-section">
          <div className="user-card">
            <h2>Hello, {user.username}! 👋</h2>
            <p className="user-email">Email: {user.email}</p>
            <p className="user-id">User ID: {user.id}</p>
          </div>

          <div className="actions">
            <h3>What would you like to do?</h3>

            <div className="button-group">
              <button
                onClick={() => navigate('/chat')}
                className="primary-button"
              >
                🗨️ Start Chat (User)
              </button>

              <button
                onClick={() => navigate('/agent')}
                className="secondary-button"
              >
                🎧 Join as Agent
              </button>

              <button
                onClick={() => navigate('/history')}
                className="secondary-button"
              >
                📋 View Chat History
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="guest-section">
          <h2>Please log in to continue</h2>
          <p>You need to be logged in to access the chat features.</p>
          <button
            onClick={() => navigate('/login')}
            className="login-button"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
