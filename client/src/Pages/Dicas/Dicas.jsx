import React from 'react';
import './Dicas.css';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from '../../Components/Header/Header';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleBills = () => {
    navigate('/RegisterBills');
};
  const handlePrice = () => {
    navigate('/PricingDashboard');
  }

  return (
    <div className='t3'>
      <Header showIcon={false} />
      <div className='t3-bottom'>
        <h1 className='t3-title'>Aprenda onde começar!</h1>

      </div>
      <BottomNavigation/>
    </div>

  );
};

export default Dashboard;