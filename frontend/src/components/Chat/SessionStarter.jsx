import React from 'react';

const SessionStarter = ({ onStartSession, loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        gap: 20,
      }}
    >
      <h2>Welcome to the Chat</h2>
      <p>Click below to start a new session with an agent.</p>
      <button
        onClick={onStartSession}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          borderRadius: 6,
          border: 'none',
          background: '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Starting...' : 'Start Chat'}
      </button>
    </div>
  );
};

export default SessionStarter;
