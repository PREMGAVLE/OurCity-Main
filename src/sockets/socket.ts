// src/sockets/socket.ts
import { io, Socket } from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_URL; // Replace with your backend
let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(URL, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }
  return socket;
};