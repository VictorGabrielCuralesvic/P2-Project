import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './BillsRegisterGraphics.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendar } from 'react-icons/fa';

// Registrar os componentes do Chart.js
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const BillsRegisterGraphics = ({ transaction = [] }) => {
  const labels = transaction.map(t => new Date(t.date).toLocaleDateString());
  const incomeData = transaction.filter(t => t.type === 'INCOME').map(t => t.amount);
  const expenseData = transaction.filter(t => t.type === 'EXPENSE').map(t => t.amount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Lucro',
        data: incomeData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Gastos',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
