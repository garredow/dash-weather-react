import React from 'react';
import ForecaseSection from '../ForecastSection/ForecastSection';

const Summary = props => {
  if (!props.data) return null;

  return (
    <ForecaseSection title="Forecast">
      <h3>This Hour</h3>
      {props.data.hour}
      <h3>This Day</h3>
      {props.data.day}
      <h3>This Week</h3>
      {props.data.week}
    </ForecaseSection>
  );
};

export default Summary;
