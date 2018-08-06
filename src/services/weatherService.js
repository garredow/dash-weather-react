import axios from 'axios';
import { logger } from './loggerService';

class WeatherService {
  getForecast(latitude, longitude) {
    if (process.env.NODE_ENV === 'development') {
      return axios.get('test-data.json').then(res => res.data);
    }

    return axios
      .get(`https://proxy.garredow.co/weather/${latitude}/${longitude}`)
      .then(res => res.data)
      .catch(err => logger.log(err));
  }
}

export default WeatherService;
