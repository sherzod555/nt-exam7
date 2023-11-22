import React, { useContext, useEffect } from 'react';
import Sidebar from '../Main/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context';


export const MainLayout = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);

  return (
    <div className='flex '>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
