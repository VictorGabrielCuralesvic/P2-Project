import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LogoPC from '../../Assets/LogoPC.png';
import './Header.css';

const Header = ({ showIcon = false }) => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      {showIcon && (
      <div className='header-icon'>
        <FaArrowLeft onClick={() => navigate('/Dashboard')} />
      </div>
    )}
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
