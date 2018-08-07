import React from 'react';
import { connect } from 'react-redux';
import { setForecast, setLocation } from '../../actions';
import GeoService from '../../services/geoService';
import WeatherService from '../../services/weatherService';
import AlertSection from '../../components/AlertSection/AlertSection';
import HourlySection from '../../components/HourlySection/HourlySection';
import DailySection from '../../components/DailySection/DailySection';
import Summary from '../../components/Summary/Summary';
import { logger } from '../../services/loggerService';
import './Forecast.css';

class Forecast extends React.Component {
  state = {};

  async componentDidMount() {
    const geoService = new GeoService();
    const weatherService = new WeatherService();

    if (this.props.forecast && this.props.location) return;

    try {
      const location = await geoService.getCurrentLocation();
      this.props.setLocation(location);

      const forecast = await weatherService.getForecast(location.latitude, location.longitude);
      this.props.setForecast(forecast);
    } catch (err) {
      logger.log(err);
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    let now = {};
    let summary;

    if (this.props.forecast) {
      const forecast = this.props.forecast;
      now = {
        temperature: parseInt(forecast.currently.temperature, 10),
        high: parseInt(forecast.daily.data[0].temperatureMax, 10),
        low: parseInt(forecast.daily.data[0].temperatureMin, 10),
      };
      summary = {
        hour: forecast.minutely.summary,
        day: forecast.hourly.summary,
        week: forecast.daily.summary,
      };

      // TODO: Refactor
      document.body.style.backgroundImage = `url('images/backgrounds/${forecast.currently.icon}.jpg')`;
    }

    let location;
    if (!this.props.location) location = 'Finding your location...';
    else if (!this.props.forecast) location = 'Getting forecast...';
    else location = this.props.location.name;

    return (
      <div className="Forecast">
        <section className="Forecast-now">
          <div className="Forecast-temperature">{now.temperature || '0'}</div>
          <div>
            <span className="Forecast-high">{now.high || '0'}&deg;</span>
            <span className="Forecast-low">{now.low || '0'}&deg;</span>
          </div>
          {location && <div className="Forecast-location">{location}</div>}
        </section>

        {this.props.forecast && <AlertSection alerts={this.props.forecast.alerts} />}

        <Summary data={summary} />

        {this.props.forecast && <HourlySection data={this.props.forecast.hourly} />}

        {this.props.forecast && <DailySection data={this.props.forecast.daily} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forecast: state.forecast,
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  setForecast: forecast => dispatch(setForecast(forecast)),
  setLocation: location => dispatch(setLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecast);
