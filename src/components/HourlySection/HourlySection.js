import React from 'react';
import ForecastSection from '../ForecastSection/ForecastSection';
import HourlyRow from '../HourlyRow/HourlyRow';

const HourlySection = props => {
  if (!props.data) return null;

  const rows = props.data.data.slice(0, 12).map(hour => <HourlyRow conditions={hour} key={hour.time} />);

  return (
    <ForecastSection title="Hourly">
      <p>{props.data.summary}</p>
      {rows}
    </ForecastSection>
  );
};

export default HourlySection;
