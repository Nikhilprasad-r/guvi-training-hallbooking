import { Server } from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Emit a message to the client
    socket.emit("message", "Welcome to the WebSocket server!");

    // Listen for messages from the client
    socket.on("clientMessage", (msg) => {
      console.log("Message from client:", msg);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io; 
};

export default initializeSocket;
