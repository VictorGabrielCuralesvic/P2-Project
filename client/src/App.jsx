import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Pages/Login';
import RegisterScreen from './Pages/Register';
import ResetPasswordScreen from './Pages/ResetPass';
import ProfileEdit from './Pages/ProfileEdit';
import UserProfile from './Pages/UserProfile';
import Dashboard from './Pages/Dashboard';
import RegisterBills from './Pages/RegisterBills';
import PricingDashboard from './Pages/PriceCalc';
import PricingInfo from './Pages/PriceCalc/calc';
import Vendas from './Pages/RegisterBills/vendas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Register" element={<RegisterScreen/>} />
        <Route path="/ResetPassword" element={<ResetPasswordScreen/>} />
        <Route path="/ProfileEdit" element={<ProfileEdit/>} />
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/RegisterBills" element={<RegisterBills/>} />
        <Route path="/PricingDashboard" element={<PricingDashboard/>} />
        <Route path="/PricingInfo" element={<PricingInfo/>} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  );
};

export default App;