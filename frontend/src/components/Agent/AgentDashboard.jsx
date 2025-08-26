import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AgentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const agentId = localStorage.getItem('agentId');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await api.get(`/api/agent-sessions/${agentId}`);
        setSessions(data.sessions || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };

    fetchSessions();
  }, [agentId]);

  const joinSession = (sessionId) => {
    navigate(`/agent-chat/${sessionId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Agent Dashboard ({agentId})</h2>
      {sessions.length === 0 ? (
        <p>No active sessions</p>
      ) : (
        sessions.map((s) => (
          <div key={s.sessionId} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: '8px' }}>
            <p><strong>Session:</strong> {s.sessionId}</p>
            <p><strong>User:</strong> {s.userId}</p>
            <p>Status: {s.isActive ? "🟢 Active" : "🔴 Ended"}</p>
            {s.isActive && (
              <button onClick={() => joinSession(s.sessionId)} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#2ecc71', color: 'white', cursor: 'pointer' }}>
                Join Chat
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AgentDashboard;
