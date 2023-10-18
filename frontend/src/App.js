import React, { useState } from 'react';
import './App.css';
import CoachLog from './CoachLog.js';
import ChessPlayerLog from './ChessPlayerLog.js';
import LoginForm from './LoginForm.js';

const App = () => {
  const [Role, setRole] = useState(''); // Initialize Role state

  // Callback function to set the Role state
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  if (Role === '') {
    return (
      <div>
        <LoginForm onRoleChange={handleRoleChange} />
      </div>
    );
  } else if (Role === 'Chess Player') {
    return (
      <div className='active'>
        <ChessPlayerLog />
      </div>
    );
  } else if (Role === 'Coach') {
    return (
      <div className='active'>
        <CoachLog />
      </div>
    );
  }
};

export default App;