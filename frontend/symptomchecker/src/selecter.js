import React, { useState } from 'react';
import './selecter.css';

const SymptomSelection = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSymptomSelect = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    if (!message) return;
    setSelectedSymptoms([...selectedSymptoms, { text: message, isUser: true }]);
    event.target.reset();
    // Add logic here to send message to AI and receive response
  };

  return (
    <div>
        <span className='selecter'>
            <h2>Symptoms Selecter</h2>
            <form className="message-input" onSubmit={handleSymptomSelect}>
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
            </form>
        </span>
        <span className="chatbox">
            <div className="message-container">
                {selectedSymptoms.map((symptom, index) => (
                    <div className="message" key={index}>{symptom.text}</div>
                ))}
            </div>
            <button type="submit">Send</button>
        </span>
    </div>
  );
};

export default SymptomSelection;
