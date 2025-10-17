import React, { useEffect, useState, useRef } from 'react';
import { connectSocket, getSocket, disconnectSocket } from '../../services/socket';

const ChatWindow = ({ sessionId, userType, onEndSession }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sessionActive, setSessionActive] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // connect socket
    const socket = connectSocket();

    // join session
    socket.emit('join_session', { sessionId, userType });

    // listen for existing messages
    socket.on('session_joined', ({ messages: existingMessages }) => {
      setMessages(existingMessages || []);
    });

    // listen for new messages
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // listen for session end
    socket.on('session_ended', () => {
      setSessionActive(false);
      alert('Chat session has ended.');
      if (onEndSession) onEndSession();
    });
    return () => {
      disconnectSocket();
    };
  }, [sessionId, userType, onEndSession]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = { sessionId, sender: userType, text };
    const socket = getSocket();
    if (socket) {
      socket.emit('send_message', msg);
    }
    setText('');
  };

  const leaveSession = () => {
    if (window.confirm("Are you sure you want to leave the chat?")) {
      const socket = getSocket();
      if (socket) {
        socket.emit('end_session', { sessionId });
      }
      setSessionActive(false);
      if (onEndSession) onEndSession();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!sessionActive) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Session ended.</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
      <h3 style={{ textAlign: 'center' }}>Chat Session: {sessionId}</h3>

      {/* Chat Messages */}
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px', background: '#f9f9f9' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === userType ? 'right' : 'left', marginBottom: '8px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '16px',
              background: m.sender === userType ? '#3498db' : '#ecf0f1',
              color: m.sender === userType ? 'white' : 'black',
              maxWidth: '70%',
              wordWrap: 'break-word'
            }}>
              <b>{m.sender === userType ? 'You' : m.sender}:</b> {m.text}
              <div style={{ fontSize: '10px', textAlign: 'right' }}>
                {m.createdAt
                  ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input & Send */}
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          disabled={!sessionActive}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{ marginLeft: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3498db', color: 'white', cursor: 'pointer' }}
          disabled={!sessionActive}
        >
          Send
        </button>
      </div>

      {/* Leave Button */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={leaveSession}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#e74c3c',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Leave Chat
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
