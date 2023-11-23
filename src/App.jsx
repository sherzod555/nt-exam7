import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Chat from './components/Main/Chat';
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './components/LoginRegister/LoginPage';
import RegisterPage from './components/LoginRegister/RegisterPage';
import { ChatProvider } from './context/chatContext';

export const App = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="auth" exact Component={AuthLayout}>
              <Route path="login" Component={LoginPage} />
              <Route path="register" Component={RegisterPage} />
            </Route>
            <Route path="/" Component={MainLayout}>
              <Route index Component={Chat} />
            </Route>
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;
