import React from 'react';
import './AlertDetail.css';

class AlertDetail extends React.Component {
  state = {};

  componentDidMount() {
    if (this.props.location.state) {
      this.setState(this.props.location.state);
    }
  }

  render() {
    const alert = this.state.alert;

    if (!alert) return <div>No alert to display</div>;

    return (
      <div className="AlertDetail">
        <div className="AlertDetail-card">
          <h2 className="AlertDetail-title">{alert.title}</h2>
          <div className="AlertDetail-times">
            <div>Issued: {new Date(alert.time * 1000).toLocaleString()}</div>
            <div>Expires: {new Date(alert.expires * 1000).toLocaleString()}</div>
          </div>
          <p className="AlertDetail-description">{alert.description}</p>
        </div>
      </div>
    );
  }
}

export default AlertDetail;
