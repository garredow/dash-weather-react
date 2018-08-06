import React from 'react';
import ForecastSection from '../ForecastSection/ForecastSection';
import DailyRow from '../DailyRow/DailyRow';

const DailySection = props => {
  if (!props.data) return null;

  const rows = props.data.data.map(day => <DailyRow conditions={day} key={day.time} />);

  return (
    <ForecastSection title="Daily">
      <p>{props.data.summary}</p>
      {rows}
    </ForecastSection>
  );
};

export default DailySection;
