import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import React from "react";

const Messaging = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [httpMessage, setHttpMessage] = useState("");

  useEffect(() => {
    // Socket.IO connection
    const socket = io(backend);

    // Listen for messages from the server via WebSocket
    socket.on("message", (msg) => {
      setServerMessage(msg);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // Emit a message to the server via WebSocket
    const socket = io(backend);
    socket.emit("clientMessage", message);
  };

  const fetchHttpMessage = async () => {
    try {
      const response = await axios.get(`${backend}/api/socket/message`);
      setHttpMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  return (
    <div className="App">
      <h1>React + Socket.IO + Axios</h1>

      {/* Display WebSocket message */}
      <p>
        <strong>WebSocket message:</strong> {serverMessage}
      </p>

      {/* Display HTTP request message */}
      <p>
        <strong>HTTP request message:</strong> {httpMessage}
      </p>

      {/* Input for WebSocket message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send to Server (WebSocket)</button>

      {/* Button to fetch HTTP message */}
      <button onClick={fetchHttpMessage}>Fetch HTTP Message</button>
    </div>
  );
};

export default Messaging;
