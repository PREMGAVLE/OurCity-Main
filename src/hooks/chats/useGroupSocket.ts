// hooks/chats/useGroupSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/lib/baseUrl";

export type SocketMessage = {
  senderId: string;
  receiverId?: string;
  groupId?: string;
  message: string;
  timestamp?: string;
  payload?: any;
};

export const useGroupSocket = (
  currentUserId: string,
  groupId: string,
  onReceive: (msg: SocketMessage) => void,
  setInitialMessages?: (messages: SocketMessage[]) => void
) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!groupId || !currentUserId) return;

    const socket = io(BASE_URL, { forceNew: true });
    socketRef.current = socket;

    socket.emit("joinGroup", { groupId, userId: currentUserId });

    fetch(`${BASE_URL}api/chatGroup/getGroupMsg/${groupId}`)
      .then((res) => res.json())
      .then((data) => {
        const msgs = data?.data || [];
        setInitialMessages?.(msgs);
      })
      .catch(console.error);

    const handleReceive = (msg: SocketMessage) => {
      onReceive(msg);
    };

    socket.on("receiveGroupMessage", handleReceive);
    socket.on("groupError", (err) => alert(err.message));

    return () => {
      socket.off("receiveGroupMessage", handleReceive);
      socket.off("groupError");
      socket.disconnect();
    };
  }, [groupId, currentUserId]);

  const sendGroupMessage = (msg: SocketMessage) => {
    socketRef.current?.emit("sendGroupMessage", msg);
  };

  return { sendGroupMessage };
};

