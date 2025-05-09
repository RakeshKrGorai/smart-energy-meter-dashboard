import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import GaugeChart from './GaugeChart';
import StatusBlock from './StatusBlock';
import '../styles/Dashboard.css';

function DeviceDashboard() {
  const { deviceId } = useParams();  // Get the deviceId from URL
  const [deviceData, setDeviceData] = useState({
    labels: [],
    datasets: [{ label: 'System Metrics', data: [], borderColor: '#4CAF50', tension: 0.4 }],
  });
  const [powerReading, setPowerReading] = useState("-");
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/meter-data?deviceId=${deviceId}`);
        const data = await response.json();

        // Prepare new data for chart
        const newData = {
          labels: data.map((entry) => new Date(entry.createdAt).toLocaleTimeString()),
          datasets: [{
            label: 'Power Consumption',
            data: data.map((entry) => entry.power),
            borderColor: '#4CAF50',
            tension: 0.4,
          }],
        };

        setDeviceData(newData);

        // Set the latest power, voltage, and current
        const latestData = data[data.length - 1];
        setPower(latestData.power);
        setVoltage(latestData.voltage);
        setCurrent(latestData.current);
        setPowerReading(`${latestData.power} W`);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to update data every 5 seconds
    const interval = setInterval(fetchData, 5000);  // Fetch data every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);

  }, [deviceId]);  // Refetch data if deviceId changes

  return (
    <div className="device-dashboard">
      <h1>Device Dashboard: {deviceId}</h1>
      <div className="dashboard-content">
        <div className="left-panel">
          <Line data={deviceData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </div>
        <div className="right-panel">
          <GaugeChart title="Voltage Reading" value={voltage} unit="V" />
          <GaugeChart title="Current Reading" value={current} unit="A" />
          <StatusBlock status={powerReading} title="Power Reading" unit="W" />
        </div>
      </div>
    </div>
  );
}

export default DeviceDashboard;
