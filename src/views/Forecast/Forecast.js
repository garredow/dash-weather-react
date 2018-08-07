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
    if (this.props.forecast && this.props.location) return;

    const geoService = new GeoService();
    const weatherService = new WeatherService();

    try {
      const location = await geoService.getCurrentLocation();
      this.props.setLocation(location);

      const forecast = await weatherService.getForecast(location.latitude, location.longitude);
      this.props.setForecast(forecast);
    } catch (err) {
      logger.log(err);
    }
  }

  getLocationMessage() {
    if (!this.props.location) return 'Finding your location...';
    else if (!this.props.forecast) return 'Getting forecast...';
    else return this.props.location.name;
  }

  getSummary() {
    const forecast = this.props.forecast;
    if (!forecast) return null;

    return {
      hour: forecast.minutely.summary,
      day: forecast.hourly.summary,
      week: forecast.daily.summary,
    };
  }

  getNow() {
    const forecast = this.props.forecast;
    if (!forecast) return {};

    return {
      temperature: parseInt(forecast.currently.temperature, 10),
      high: parseInt(forecast.daily.data[0].temperatureMax, 10),
      low: parseInt(forecast.daily.data[0].temperatureMin, 10),
    };
  }

  render() {
    const now = this.getNow();
    const summary = this.getSummary();
    const forecast = this.props.forecast;

    // TODO: Refactor
    if (forecast) {
      document.body.style.backgroundImage = `url('images/backgrounds/${forecast.currently.icon}.jpg')`;
    }

    return (
      <div className="Forecast">
        <section className="Forecast-now">
          <div className="Forecast-temperature">{now.temperature || '0'}</div>
          <div>
            <span className="Forecast-high">{now.high || '0'}&deg;</span>
            <span className="Forecast-low">{now.low || '0'}&deg;</span>
          </div>
          <div className="Forecast-location">{this.getLocationMessage()}</div>
        </section>

        {forecast && <AlertSection alerts={forecast.alerts} />}

        <Summary data={summary} />

        {forecast && <HourlySection data={forecast.hourly} />}

        {forecast && <DailySection data={forecast.daily} />}
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
