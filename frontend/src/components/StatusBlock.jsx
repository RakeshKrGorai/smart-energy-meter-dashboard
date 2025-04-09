import React from 'react';
import '../styles/StatusBlock.css';
import { Activity } from 'lucide-react';

import currency from "../../assets/rupee.png";

function StatusBlock({ status, title, unit }) {

  return (
    <div className={`status-block ${status}`}>
      {(unit==="W")?<Activity size={24} />:<img src={currency} className='currency-image'/>}
      
      <h2>{title}</h2>
      <p className="status-text">{status>1000?status/1000:status} &nbsp;
      {/* <span>{status>1000?"kW":"W"}</span> */}
      </p>
    </div>
  );
}

export default StatusBlock;