import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleClearConversation = () => {
    console.log('Clearing conversation...');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className='bg-slate-100 h-screen'>
      <h2>Sidebar</h2>
      <div className='flex flex-col'>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <button onClick={handleClearConversation}>Clear Conversation</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
