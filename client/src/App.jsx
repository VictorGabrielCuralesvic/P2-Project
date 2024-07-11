import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Pages/Login/LoginScreen';
import RegisterScreen from './Pages/Register/RegisterScreen';
import ResetPasswordScreen from './Pages/ResetPass/ResetPasswordScreen';
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit';
import UserProfile from './Pages/UserProfile/UserProfile';
import Dashboard from './Pages/Dashboard/Dashboard';
import PricingDashboard from './Pages/PricingDashboard/PricingDashboard';
import PricingInfo from './Pages/PriceCalc/calc';
import Vendas from './Pages/Vendas/vendas';
import BillsRegister from './Pages/RegisterBills/BillsRegister';

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
        <Route path="/RegisterBills" element={<BillsRegister/>} />
        <Route path="/PricingDashboard" element={<PricingDashboard/>} />
        <Route path="/PricingInfo" element={<PricingInfo/>} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  );
};

export default App;