import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import ChatWindow from './ChatWindow';

const ChatApp = () => {
  const { sessionId: routeSessionId } = useParams();
  const [sessionId, setSessionId] = useState(routeSessionId || null);

  useEffect(() => {
    if (routeSessionId) setSessionId(routeSessionId);
  }, [routeSessionId]);

  useEffect(() => {
  const savedSession = localStorage.getItem('sessionId');
  if (savedSession) {
    setSessionId(savedSession);
  } else if (routeSessionId) {
    setSessionId(routeSessionId);
  }
}, [routeSessionId]);

  const startSession = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await api.post('/api/startsession', { userId: user.id });
      setSessionId(data.sessionId);
      localStorage.setItem('sessionId', data.sessionId);
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

  const endSession = () => {
    setSessionId(null);
    localStorage.removeItem('sessionId');
  };

  return (
    <div>
      {!sessionId ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>🗨️ Start a Chat</h2>
          <button onClick={startSession} style={{ padding: '12px 24px', fontSize: '18px', borderRadius: '8px', border: 'none', backgroundColor: '#3498db', color: 'white', cursor: 'pointer' }}>
            Start Chat
          </button>
        </div>
      ) : (
        <ChatWindow sessionId={sessionId} userType="user" onEndSession={endSession} />
      )}
    </div>
  );
};

export default ChatApp;
