import React from 'react';
import './App.css';
//import Chatbox from './Chatbox';
import SymptomSelection from './selecter';
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <HomeScreen />
    // <div className="App">
    //   <header className="App-header">
    //     <nav className="navbar">
    //         <div className="company-logo">
    //           <img src="C:\Users\vamsi\Downloads\Hack_KU_2024\HackKU2024\frontend\symptomchecker\public\logo512.png" alt="Logo" />
    //           <span>HACK KU</span>
    //         </div>
    //         <div className="login-profile">
    //           <a href="#">Login</a>
    //           {/* Or use a profile icon or name based on your design */}
    //         </div>
    //     </nav>
    //     <div className='content'>
    //         <SymptomSelection />
    //     </div>
    //   </header>
    // </div>
  );
}

export default App;
