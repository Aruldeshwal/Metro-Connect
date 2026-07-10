import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { prisma } from "../lib/database";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join_conversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined conversation: ${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId: string) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} left conversation: ${conversationId}`);
  });

  socket.on("send_message", async (data) => {
    const { conversation_id, sender_id, content } = data;

    try {
      // Save message to database
      const message = await prisma.message.create({
        data: {
          conversation_id,
          sender_id,
          content,
        },
      });

      // Broadcast to everyone in the room (including sender for simplicity/confirmation)
      io.to(conversation_id).emit("new_message", message);
      
      // Update last message timestamp in conversation
      await prisma.conversation.update({
        where: { id: conversation_id },
        data: { last_message_timestamp: new Date() },
      });
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
