import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/ActiveDevices.css";

const ActiveDevices = () => {
    const [activeDevices, setActiveDevices] = useState([]);

    useEffect(() => {
        const fetchActiveDevices = async () => {
            try {
                const response = await axios.get('http://localhost:4000/active-devices');
                setActiveDevices(response.data);
            } catch (error) {
                console.error("Error fetching active devices:", error);
            }
        };

        fetchActiveDevices();
    }, []);

    return (
        <div className="active-devices-container">
            <h2>Active Devices</h2>
            {activeDevices.length > 0 ? (
                <ul className="active-devices-list">
                    {activeDevices.map((device) => (
                        <li key={device}>{device}</li>
                    ))}
                </ul>
            ) : (
                <p>No active devices found.</p>
            )}
        </div>
    );
};

export default ActiveDevices;
