import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../styles/GaugeChart.css';

function GaugeChart({ title, value, unit }) {
  // Set custom ranges
  const getGaugeParams = () => {
    if (unit === "A") return { max: 1, color: "#FF9B17" };    // Current: 0-1A (orange)
    if (unit === "V") return { max: 250, color: "#1B56FD" };  // Voltage: 0-250V (blue)
    return { max: 100, color: "#888" };                       // Default
  };

  const { max, color } = getGaugeParams();
  const adjustedValue = Math.min(value, max);
  const remaining = max - adjustedValue;

  const data = {
    datasets: [{
      data: [adjustedValue, remaining],
      backgroundColor: [color, '#f5f5f5'],
      circumference: 180,
      rotation: 270,
    }]
  };

  return (
    <div className="gauge-container">
      <h2>{title}</h2>
      <div className="gauge-chart">
        <Doughnut 
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            cutout: '75%'
          }} 
        />
        <div className="gauge-value">
          <span>{value.toFixed(2)}</span>
          <span className="unit">{unit}</span>
        </div>

      </div>
    </div>
  );
}

export default GaugeChart;