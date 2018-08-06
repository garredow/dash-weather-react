import * as React from 'react';
import './DailyRow.css';

const DailyRow = ({ conditions }) => {
  const date = new Date(conditions.time * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="DailyRow">
      <img className="DailyRow-icon" src={`/images/icons/${conditions.icon}.png`} alt={conditions.summary} />
      <div>
        <span className="DailyRow-high">{parseInt(conditions.temperatureMax, 10)}&deg;</span>
        <span className="DailyRow-low">{parseInt(conditions.temperatureMin, 10)}&deg;</span>
        <span className="DailyRow-date">{date}</span>
        <div>{conditions.summary}</div>
      </div>
    </div>
  );
};

export default DailyRow;
