import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) return navigate('/');
  }, [user]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <Outlet />
    </div>
  );
}
