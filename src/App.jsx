import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegisterPage from './components/LoginRegister/LoginRegisterPage';
import MainPage from './components/Main/MainPage';

export const App = () => {
  return (
    <Router>
      <Routes>

      <Route path="/login" exact component={LoginRegisterPage} />
      <Route path="/" component={MainPage} />
      {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
