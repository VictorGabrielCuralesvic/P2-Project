import React from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import './BottomNavigation.css';
import { FaMagnifyingGlassChart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-navigation">
      <div className="nav-item">
        <FaHome onClick={() => navigate('/Dashboard')}/>
      </div>
      <div className="nav-item">
        <FaMagnifyingGlassChart />
      </div>
      <div className="nav-item">
        <FaUser  onClick={() => navigate('/UserProfile')}/>
      </div>
    </div>
  );
};

export default BottomNavigation;
