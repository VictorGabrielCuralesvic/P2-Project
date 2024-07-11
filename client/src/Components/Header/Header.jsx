import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPC from '../../Assets/LogoPC.png';
import './Header.css';

const Header = ({ showIcon = false }) => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='teste'/>
      <div className='header-name'>
        <h1>Preço Certo</h1>
      </div>
      <div className='header-logo'>
        <img src={LogoPC} alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
