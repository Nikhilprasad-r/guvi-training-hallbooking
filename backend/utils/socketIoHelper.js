const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages with sender and receiver
    socket.on("chat message", (messageData) => {
      const { sender, receiver, message } = messageData;
      console.log(`Message from ${sender} to ${receiver}: ${message}`);
      
      // Emit the message to all clients
      io.emit("chat message", { sender, receiver, message });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default setupSocket;
