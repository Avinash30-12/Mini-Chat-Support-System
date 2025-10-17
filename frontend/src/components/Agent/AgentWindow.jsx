import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../Chat/ChatWindow';

const AgentChatWrapper = () => {
  const { sessionId } = useParams();
  const [currentSession, setCurrentSession] = React.useState(sessionId);

  const endSession = () => {
    setCurrentSession(null);
  };

  return currentSession ? (
    <ChatWindow sessionId={currentSession} userType="agent" onEndSession={endSession} />
  ) : (
    <div style={{ padding: '20px', textAlign: 'center' }}>Session ended</div>
  );
};

export default AgentChatWrapper;
