import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DeviceList.css';

function DeviceList() {
    const [devices, setDevices] = useState([]);

    // Only change the fetch function to handle missing data
    useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const response = await fetch('http://localhost:4000/device-status');
        const data = await response.json();
        
        // Backend now guarantees both devices will be present
        setDevices(data);
      } catch (error) {
        console.error('Error:', error);
        // Fallback UI if needed
        setDevices([
          { deviceId: "ESP32_METER_01_SOCKET_1", isOnline: false },
          { deviceId: "ESP32_METER_01_SOCKET_2", isOnline: false }
        ]);
      }
    };
    
    fetchDeviceStatus();
    const intervalId = setInterval(fetchDeviceStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

    return (
        <div className="device-list-container">
            <div className="header-section">
                <h1 className="main-heading">IoT Smart Energy Meter</h1>
                <p className="subheading">Monitor and manage your connected devices</p>
            </div>
            
            <div className="device-grid">
                {devices.map((device) => (
                    <div 
                        key={device.deviceId} 
                        className={`device-card ${device.isOnline ? 'online' : 'offline'}`}
                    >
                        <div className="device-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10 10 10 0 01-10-10 10 10 0 0110-10zm0 2a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8zm-1 3h2v6h-2V7zm0 8h2v2h-2v-2z" />
                            </svg>
                        </div>
                        <div className="device-info">
                            <h3 className="device-name">{device.deviceId}</h3>
                            <p className= {`device-status ${device.isOnline ? 'device-online' : 'device-offline'}`}>
                                {device.isOnline ? 'Online' : 'Offline'}
                            </p>
                            {device.lastSeen && (
                                <p className="last-seen">
                                    Last updated: {new Date(device.lastSeen).toLocaleTimeString()}
                                </p>
                            )}
                            <div className="device-metrics">
                                <span>Voltage: {device.voltage || '--'}V</span>
                                <span>Current: {device.current || '--'}A</span>
                                <span>Power: {device.power || '--'}W</span>
                            </div>
                        </div>
                        <Link 
                            to={`/dashboard/device/${device.deviceId}`}
                            className="view-button"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            <div className="download-section">
        <h2>Download Meter Data</h2>
        <button className="download-btn" onClick={() => handleDownload("json")}>
          Download JSON
        </button>
        <button className="download-btn" onClick={() => handleDownload("csv")}>
          Download CSV
        </button>
      </div>
        </div>
    );
}

export default DeviceList;