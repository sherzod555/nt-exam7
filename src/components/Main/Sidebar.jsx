import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const handleClearConversation = () => {
    console.log('Clearing conversation...');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Sidebar</h2>
      <div>
        <Link to="/main">Home</Link>
        <Link to="/settings">Settings</Link>
        <button onClick={handleClearConversation}>Clear Conversation</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
