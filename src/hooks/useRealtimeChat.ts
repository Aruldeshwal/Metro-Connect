import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket/socket";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: string;
}

export const useRealtimeChat = (conversationId: string, currentUserId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!conversationId) return;

    function onConnect() {
      setIsConnected(true);
      socket.emit("join_conversation", conversationId);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewMessage(message: Message) {
      setMessages((prev) => [...prev, message]);
    }

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new_message", onNewMessage);

    // If already connected, join room
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new_message", onNewMessage);
      socket.emit("leave_conversation", conversationId);
      socket.disconnect();
    };
  }, [conversationId]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim() || !conversationId) return;

    const messageData = {
      conversation_id: conversationId,
      sender_id: currentUserId,
      content,
    };

    socket.emit("send_message", messageData);
  }, [conversationId, currentUserId]);

  return {
    messages,
    setMessages,
    sendMessage,
    isConnected,
  };
};
