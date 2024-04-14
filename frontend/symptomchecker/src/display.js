import React from 'react';
import SymptomSelection from './selecter';
import './display.css';

const SymptomDisplay = ({ selectedSymptoms }) => {
  return (
    <div className="chatbox">
        <div className="message-container">
        {selectedSymptoms.map((symptom, index) => (
            <div className="user-message" key={index}>{symptom}</div>
        ))}
        </div>
    </div>
  );
};

export default SymptomDisplay;