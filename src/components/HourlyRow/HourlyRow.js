import React from 'react';
import './HourlyRow.css';

const HourlyRow = ({ conditions }) => {
  const time = new Date(conditions.time * 1000)
    .getHours()
    .toString()
    .padStart(2, '0');
  return (
    <div className="HourlyRow">
      <span className="HourlyRow-time">{time}</span>
      <img className="HourlyRow-icon" src={`/images/icons/${conditions.icon}.png`} alt={conditions.summary} />
      <span className="HourlyRow-temperature">{parseInt(conditions.temperature, 10)}&deg;</span>
      <span className="HourlyRow-summary">{conditions.summary}</span>
    </div>
  );
};

export default HourlyRow;
