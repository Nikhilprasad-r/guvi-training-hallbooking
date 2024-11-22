const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // Broadcast to all clients
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default setupSocket;
