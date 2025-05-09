import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeviceList from './components/DeviceList';
import DeviceDashboard from './components/DeviceDashboard';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeviceList />} />
        <Route path="/dashboard/device/:deviceId" element={<DeviceDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
