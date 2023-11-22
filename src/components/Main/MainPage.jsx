import React, { useEffect } from 'react';
import Sidebar from './Sidebar';

export const MainPage = () => {
    const user = localStorage.getItem('user');
    useEffect(() => {
        
    },[user])
  return (
    <div>
      <h1>Main Page</h1>
      <Sidebar />
      {/* Add your chat component here */}
    </div>
  );
};

export default MainPage;
