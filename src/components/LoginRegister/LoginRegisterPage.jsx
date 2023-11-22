import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate email and password, perform login logic
    // For simplicity, let's just check if they are not empty
    if (email && password) {
      // Save to local storage
      localStorage.setItem('user', JSON.stringify({ email, password }));
      // Redirect to the main page
      navigate('/')
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <div>
      <h1>Login/Register Page</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginRegisterPage;
