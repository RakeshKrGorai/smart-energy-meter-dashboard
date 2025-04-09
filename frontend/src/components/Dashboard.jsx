import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import StatusBlock from './StatusBlock';
import GaugeChart from './GaugeChart';
import '../styles/Dashboard.css';

function Dashboard() {
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [{
      label: 'System Metrics',
      data: [],
      borderColor: '#4CAF50',
      tension: 0.4
    }]
  });

  const [powerReading, setpowerReading] = useState('healthy');
  const [Reading, setReading] = useState(75);

  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const newData = {
        labels: Array.from({ length: 10 }, (_, i) => `${i + 1}m ago`),
        datasets: [{
          label: 'System Metrics',
          data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          borderColor: '#4CAF50',
          tension: 0.4
        }]
      };
      setLineData(newData);
      // setpowerReading(Reading*Reading);
      setpowerReading("-")
      setReading(Math.floor(Math.random() * (100 - 60) + 60));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">System Dashboard</h1>
      <h3 className='subheading'>Device 1</h3>
      <div className="dashboard-content">
        <div className="left-panel">
          <Line data={lineData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} />
        </div>
        <div className="right-panel">
          <GaugeChart title={"Voltage Reading"} value={Reading} unit={"V"} />
          <GaugeChart title={"Current Reading"} value={Reading} unit={"A"} />
          <StatusBlock status={powerReading} title={"Power Reading"} unit={"W"} />
          <StatusBlock status={powerReading} title={"Estimated Cost"} unit={"INR"}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;