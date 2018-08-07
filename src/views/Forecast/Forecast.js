import React from 'react';
import GeoService from '../../services/geoService';
import WeatherService from '../../services/weatherService';
import AlertSection from '../../components/AlertSection/AlertSection';
import HourlySection from '../../components/HourlySection/HourlySection';
import DailySection from '../../components/DailySection/DailySection';
import Summary from '../../components/Summary/Summary';
import { logger } from '../../services/loggerService';
import './Forecast.css';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      weather: null,
    };
  }
  async componentDidMount() {
    const geoService = new GeoService();
    const weatherService = new WeatherService();

    try {
      const location = await geoService.getCurrentLocation();
      const weather = await weatherService.getForecast(location.latitude, location.longitude);

      !this.isCancelled && this.setState({ location, weather });
    } catch (err) {
      console.log('logger:', logger);
      logger.log(err);
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    let now = {};
    let summary;

    if (this.state.weather) {
      const weather = this.state.weather;
      now = {
        temperature: parseInt(weather.currently.temperature, 10),
        high: parseInt(weather.daily.data[0].temperatureMax, 10),
        low: parseInt(weather.daily.data[0].temperatureMin, 10),
      };
      summary = {
        hour: weather.minutely.summary,
        day: weather.hourly.summary,
        week: weather.daily.summary,
      };

      // TODO: Refactor
      document.body.style.backgroundImage = `url('images/backgrounds/${weather.currently.icon}.jpg')`;
    }

    let location;
    if (!this.state.location) location = 'Finding your location...';
    else if (!this.state.weather) location = 'Getting forecast...';
    else location = this.state.location.name;

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

        {this.state.weather && <AlertSection alerts={this.state.weather.alerts} />}

        <Summary data={summary} />

        {this.state.weather && <HourlySection data={this.state.weather.hourly} />}

        {this.state.weather && <DailySection data={this.state.weather.daily} />}
      </div>
    );
  }
}

export default Forecast;
