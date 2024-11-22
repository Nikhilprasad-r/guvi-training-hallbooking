import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const backend = import.meta.env.VITE_BACKEND;
const socket = io(backend); 

const Messaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message'); 
    };
  }, []);

  // Send message to the server
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message); 
      setMessage(''); 
    }
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <div id="chat-container">
        <ul id="messages">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messaging;
