import React from 'react';
import { Link } from 'react-router-dom';
import './Alert.css';

const Alert = props => (
  <div className="Alert">
    <Link
      to={{
        pathname: '/alert/',
        state: { alert: props.alert },
      }}
    >
      <span className="Alert-time">
        {new Date(props.alert.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })}
      </span>
      {props.alert.title}
    </Link>
  </div>
);

export default Alert;
