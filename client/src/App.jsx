import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Pages/Login';
import RegisterScreen from './Pages/Register';
import ResetPasswordScreen from './Pages/ResetPass';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/Register" element={<RegisterScreen/>} />
        <Route path="/ResetPassword" element={<ResetPasswordScreen/>} />
      </Routes>
    </Router>
  );
};

export default App;