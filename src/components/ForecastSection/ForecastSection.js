import React from 'react';
import './ForecastSection.css';

const ForecastSection = props => (
  <div className="ForecastSection">
    <h2 className="title">{props.title}</h2>
    {props.children}
  </div>
);

export default ForecastSection;
