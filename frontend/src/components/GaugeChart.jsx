import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../styles/GaugeChart.css';

function GaugeChart({ title, value, unit }) {

  const color = (unit==="A")?"#FF9B17":"#1B56FD"
  const data = {
    datasets: [{
      data: [value, 200 - value],
      backgroundColor: [
        color,
        '#f5f5f5'
      ],
      circumference: 180,
      rotation: 270,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    cutout: '75%'
  };

  return (
    <div className="gauge-container">
      <h2>{title}</h2>
      <div className="gauge-chart">
        <Doughnut data={data} options={options} />
        <div className="gauge-value">
          <span>{value}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default GaugeChart;