import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const endRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        padding: 10,
        background: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: 6,
        overflowY: 'auto',
        maxHeight: '400px',
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            style={{
              background: msg.sender === 'user' ? '#007bff' : '#e0e0e0',
              color: msg.sender === 'user' ? '#fff' : '#000',
              padding: '6px 12px',
              borderRadius: 12,
              maxWidth: '70%',
            }}
          >
            {msg.text}
          </div>
          <small style={{ fontSize: 10, color: '#666', marginTop: 2 }}>
            {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
          </small>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
