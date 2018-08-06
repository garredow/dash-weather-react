import axios from 'axios';
import { logger } from './loggerService';

class GeoService {
  locateUser() {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return Promise.resolve({ latitude: 40.1936226, longitude: -75.0890679 });
    }

    return new Promise(resolve => {
      window.navigator.geolocation.getCurrentPosition(
        location => resolve(location.coords),
        err => {
          logger.log('Error getting geolocation. Falling back to default.', err);
          resolve({ latitude: 40.1936226, longitude: -75.0890679 });
        }
      );
    });
  }

  async getLocationDetail(coords) {
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve('Devminster, Pennsylvania');
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${
      coords.latitude
    }.json?access_token=pk.eyJ1IjoiZ2FycmVkb3ciLCJhIjoiY2praDZuaWxkMDN6ODNrcXF2aDBvaWdxYyJ9.-YGzXo3I6bCVfRcOAAPDqQ&types=place%2Cregion`;
    const locationDetail = await axios
      .get(url)
      .then(res => this.formatLocation(res.data))
      .catch(err => logger.error(err));

    return locationDetail;
  }

  formatLocation(data) {
    const locationParts = [];

    const place = data.features.find(feature => feature.place_type[0] === 'place');
    if (place) locationParts.push(place.text);
    const region = data.features.find(feature => feature.place_type[0] === 'region');
    if (region) locationParts.push(region.text);

    return locationParts.join(', ');
  }

  async getCurrentLocation() {
    const coords = await this.locateUser();
    const locationName = await this.getLocationDetail(coords);

    const location = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      name: locationName,
    };

    return location;
  }
}

export default GeoService;
