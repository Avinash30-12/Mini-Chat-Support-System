import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = () => {
  if (!socket) socket = io('https://mini-chat-support-system.onrender.com');
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
