import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ChatHistory = ({ userId }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get(`/api/history/${userId}`);
        setSessions(Array.isArray(data.history) ? data.history : []);
      } catch (err) {
        console.error('Error fetching history:', err);
        setSessions([]);
      }
    };

    fetchHistory();
  }, [userId]);

  const openSession = (sessionId) => {
    navigate(`/chat/${sessionId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Chat History</h2>
      {sessions.length === 0 ? (
        <p>No past chats found.</p>
      ) : (
        <ul style={styles.list}>
          {sessions.map((s) => (
            <li
              key={s.sessionId}
              style={styles.listItem}
              onClick={() => openSession(s.sessionId)}
            >
              <strong>{new Date(s.createdAt).toLocaleString()}</strong>
              <p>Session ID: {s.sessionId}</p>
              <p>Status: {s.isActive ? '🟢 Active' : '🔴 Ended'}</p>
              <p>Messages: {s.messages.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default ChatHistory;
