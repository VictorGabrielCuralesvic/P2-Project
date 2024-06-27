import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Pages/Login';
import RegisterScreen from './Pages/Register';
import ResetPasswordScreen from './Pages/ResetPass';
import ProfileEdit from './Pages/ProfileEdit';
import UserProfile from './Pages/UserProfile';
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/Register" element={<RegisterScreen/>} />
        <Route path="/ResetPassword" element={<ResetPasswordScreen/>} />
        <Route path="/ProfileEdit" element={<ProfileEdit/>} />
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;