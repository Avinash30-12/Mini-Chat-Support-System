import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          outline: 'none',
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          background: '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
