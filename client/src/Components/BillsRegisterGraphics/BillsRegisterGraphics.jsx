import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './BillsRegisterGraphics.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendar } from 'react-icons/fa';
import useDataChart from '../../Hooks/useDataChart';

// Registrar os componentes do Chart.js
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const BillsRegisterGraphics = ({ transaction = [] }) => {
  const { data, options } = useDataChart(transaction);

  return (
    <div className='t12-1'>
        <div className='t12-1-title-box'>
            <div>
                <h2>Última Semana</h2>
            </div>
            <div className='t12-1-icon-box'>
                <div className='t2-1-icon'>
                    <FaMagnifyingGlass  />
                </div>
                <div className='t2-1-icon'>
                    <FaRegCalendar />
                </div>
            </div>
        </div>
      
      <Line data={data} options={options} />
    </div>
  );
};
export default BillsRegisterGraphics;
