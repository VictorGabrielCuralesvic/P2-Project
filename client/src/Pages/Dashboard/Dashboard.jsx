import React from 'react';
import './Dashboard.css';
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
        <h1 className='t3-title'>Top Produtos</h1>
        <div className='t3-resume'>
          <div className='t3-resume-body'>
            <div className="t3-product">Produto 1<br/><span className='t3-sales'> XX Vendas</span></div>
            <div className="t3-product">Produto 2<br/><span className='t3-sales'> XX Vendas</span></div>
          </div>
          <div className='t3-resume-body'>
            <div className="t3-product">Produto 3<br/><span className='t3-sales'> XX Vendas</span></div>
            <div className="t3-product">Produto 4<br/><span className='t3-sales'> XX Vendas</span></div>
          </div>
        </div>
      
        <div className='t3-box-button'>
          <button onClick={handlePrice} className='t3-button'>Precificações</button>
          <button onClick={handleBills} className='t3-button'>Balanço</button>
        </div>
      </div>
      <BottomNavigation/>
    </div>

  );
};

export default Dashboard;