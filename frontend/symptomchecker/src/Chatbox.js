// Chatbox.js
import React, { useState } from 'react';
import './Chatbox.css';

function Chatbox() {
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    if (!message) return;
    setMessages([...messages, { text: message, isUser: true }]);
    event.target.reset();
    // Add logic here to send message to AI and receive response
  };

  return (
    <div className="chatbox">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user-message' : 'ai-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="message-input" onSubmit={handleMessageSubmit}>
        <input type="text" name="message" list="symptoms" placeholder="Type your message..." />
        <datalist id="symptoms">
          <option value="Fever" />
          <option value="Cough" />
          <option value="Headache" />
          <option value="Fatigue" />
          <option value="Nausea" />
          <option value="Dizziness" />
          <option value="Shortness of breath" />
          <option value="Muscle aches" />
          <option value="Joint pain" />
          <option value="Loss of appetite" />
        </datalist>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;
