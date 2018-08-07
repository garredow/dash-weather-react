import React from 'react';
import ForecastSection from '../ForecastSection/ForecastSection';
import Alert from '../Alert/Alert';

const AlertSection = props => {
  if (!props.alerts) return null;

  return (
    <ForecastSection title="Alerts">
      {props.alerts.map(alert => <Alert alert={alert} key={alert.time} />)}
    </ForecastSection>
  );
};

export default AlertSection;
