import React from 'react';
import { FaHome, FaChartBar, FaUser } from 'react-icons/fa';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <div className="bottom-navigation">
      <div className="nav-item">
        <FaHome />
      </div>
      <div className="nav-item">
        <FaChartBar />
      </div>
      <div className="nav-item active">
        <FaUser />
      </div>
    </div>
  );
};

export default BottomNavigation;
