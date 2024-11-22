import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const backend = import.meta.env.VITE_BACKEND;
const socket = io(backend);

const Messaging = ({sender}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(""); // New state for receiver

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  // Send message to the server
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && sender.trim() && receiver.trim()) {
      const messageData = { sender, receiver, message };
      socket.emit("chat message", messageData); // Emit message data
      setMessage(""); // Clear the input field
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Socket.IO Messaging</h1>
      <div
        id="chat-container"
        className="w-full max-w-md bg-white shadow-md rounded-lg p-4 flex flex-col gap-4"
      >
        <ul
          id="messages"
          className="flex flex-col gap-2 overflow-y-auto max-h-60 bg-gray-50 rounded-lg p-2 border border-gray-300"
        >
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === sender ? "bg-blue-100 text-right" : "bg-gray-100"
              }`}
            >
              <strong>{msg.sender}</strong> to <strong>{msg.receiver}</strong>: {msg.message}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage} className="flex flex-col gap-2">
       
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver's name"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messaging;
