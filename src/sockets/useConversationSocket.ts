// src/sockets/useConversationSocket.ts
import { useEffect } from 'react';
import { getSocket } from './socket';

export const useConversationSocket = ({
  conversationId,
  onMessageReceived,
}: {
  conversationId: string;
  onMessageReceived: (message: any) => void;
}) => {
  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) socket.connect();

    socket.emit('join-conversation', conversationId);

    socket.on('new-message', onMessageReceived);

    return () => {
      socket.emit('leave-conversation', conversationId);
      socket.off('new-message', onMessageReceived);
    };
  }, [conversationId]);
};