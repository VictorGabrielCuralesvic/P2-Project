import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './BillsRegisterGraphics.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendar } from 'react-icons/fa';

// Registrar os componentes do Chart.js
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const BillsRegisterGraphics = () => {
  const data = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], // Dias da semana
    datasets: [
      {
        label: 'Lucro',
        data: [12, 19, 3, 5, 2, 3, 15], // Dados fictícios de lucro
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Gastos',
        data: [10, 17, 6, 7, 5, 4, 20], // Dados fictícios de gastos
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
