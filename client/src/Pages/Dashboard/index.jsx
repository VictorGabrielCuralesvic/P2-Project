import React from 'react';

import '../../Components/Style.css';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleBills = () => {
    navigate('/RegisterBills');
};
  const handlePrice = () => {
    navigate('/PricingDashboard');
  }
  return (
    <div className="container">
      <h1 className="title">Preço Certo</h1>
      <div className="topproducts">
        <h2 className="toptitle">Top Produtos</h2>
        <div className="products">
          <div className="product">Produto 1<br/><span className='sales'> XX Vendas</span></div>
          <div className="product">Produto 2<br/><span className='sales'> XX Vendas</span></div>
          <div className="product">Produto 3<br/><span className='sales'> XX Vendas</span></div>
          <div className="product">Produto 4<br/><span className='sales'> XX Vendas</span></div>
        </div>
      </div>
      <button onClick={handlePrice} className='buttonL'>Precificações</button>
      <button onClick={handleBills} className='buttonL'>Balanço</button>
      <BottomNavigation/>
    </div>

  );
};

export default Dashboard;