import { useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/lib/baseUrl";
import API from "@/api/axiosInstance";
import { getMarkReadUrl, getMessagesUrl } from "@/api/urls";

export type SocketMessage = {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp?: string;
  
};

export default function useChatSocket(
  currentUserId: string,
  receiverId: string,
  onReceive: (msg: SocketMessage) => void,
  setInitialMessages?: (messages: SocketMessage[]) => void
)
 {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    const socket = io(BASE_URL, { forceNew: true });
    socketRef.current = socket;

    // Emit userOnline & join events
    socket.emit("userOnline", currentUserId);
    socket.emit("join", { userId: currentUserId });

    // Fetch existing messages via API
    API.get(getMessagesUrl(currentUserId,receiverId))
      .then((res) => {
        const msgs = res?.data?.data || [];
        setInitialMessages?.(msgs);
      })
      .catch(console.error);

    // Socket message listener
    const handleReceive = (msg: SocketMessage) => {
      if (msg.senderId === receiverId) {
        const audio = new Audio("/sounds/new-notification.mp3");
        audio.play().catch(() => console.warn("🔇 Notification sound blocked."));

        API.post(getMarkReadUrl(currentUserId)).catch(() =>
          console.error("❌ Failed to mark chat as read")
        );
      }

      onReceive(msg); // Pass message to parent
    };

    socket.on("newMessageReceived", handleReceive);

    return () => {
      socket.off("newMessageReceived", handleReceive);
      socket.disconnect();
    };
  }, [currentUserId, receiverId]);

  const sendSocketMessage = (msg: SocketMessage) => {
    socketRef.current?.emit("sendMessage", msg);
  };

  return {
    sendSocketMessage,
  };
}
