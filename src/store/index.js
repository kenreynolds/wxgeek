import { createStore } from 'vuex';
import axios from 'axios';
import dayjs from 'dayjs';

const appId = `&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`;
const baseUrl = process.env.VUE_APP_OPENWEATHERMAP_BASE_URL;
const airPollutionUrlVar = process.env.VUE_APP_AIR_POLLUTION_URL;
const oneCallWeatherUrlVar = process.env.VUE_APP_ONE_CALL_WEATHER_URL;
const reverseGeocodeUrlVar = process.env.VUE_APP_REVERSE_GEOCODE_URL;
const urlOptions = '&exclude=minutely&units=imperial';

const getCurrentCoordinates = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(position => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }, err => {
        reject(err);
      });
    });
  }
};

export default createStore({
  state: {
    currentLocation: {
      lat: 0,
      lon: 0,
      city: '',
      state: '',
    },
    currentAirQuality: {
      airQualityIndex: 0,
    },
    currentWeather: {
      airQuality: 0,
      date: '',
      feelsLike: 0,
      humidity: 0,
      pressure: 0,
      skyConditionDescription: '',
      skyConditionText: '',
      skyConditionIcon: '',
      sunrise: 0,
      sunset: 0,
      temperature: 0,
      uvIndex: 0,
      windSpeed: 0,
    },
    hourlyForecastData: [],
    isLoading: true,
  },
  mutations: {
    GET_CURRENT_LOCATION(state, payload) {
      state.currentLocation = {
        lat: payload.lat,
        lon: payload.lon,
        city: payload.name,
        state: payload.state,
      };
    },
    GET_AIR_QUALITY(state, payload) {
      state.currentAirQuality = {
        airQualityIndex: payload.main.aqi,
      };
    },
    GET_HOURLY_FORECASTS(state, payload) {
      state.hourlyForecastData = payload;
    },
    GET_WEATHER(state, payload) {
      state.currentWeather = {
        date: payload.dt,
        feelsLike: payload.feels_like,
        humidity: payload.humidity,
        pressure: payload.pressure,
        skyConditionDescription: payload.weather[0].description,
        skyConditionText: payload.weather[0].description,
        skyConditionIcon: payload.weather[0].icon,
        sunrise: payload.sunrise,
        sunset: payload.sunset,
        temperature: payload.temp,
        uvIndex: payload.uvi,
        windSpeed: payload.wind_speed,
      };
    },
  },
  actions: {
    getWeather({ commit }) {
      getCurrentCoordinates()
        .then(pos => {
          const lat = pos.lat;
          const lon = pos.lon;
          const airPollutionUrl = `${baseUrl}${airPollutionUrlVar}?lat=${lat}&lon=${lon}${appId}`;
          const oneCallWeatherUrl = `${baseUrl}${oneCallWeatherUrlVar}?lat=${lat}&lon=${lon}${urlOptions}${appId}`;
          const reverseGeocodeUrl = `${baseUrl}${reverseGeocodeUrlVar}?lat=${lat}&lon=${lon}${appId}`;

          axios.all([
            axios.get(reverseGeocodeUrl),
            axios.get(oneCallWeatherUrl),
            axios.get(airPollutionUrl),
          ]).then(axios.spread((geoResponse, weatherResponse, airPollutionResponse) => {
            if (geoResponse.length !== 0 && weatherResponse.length !== 0 && airPollutionResponse !== 0) {
              commit('GET_CURRENT_LOCATION', geoResponse.data[0]);
              commit('GET_AIR_QUALITY', airPollutionResponse.data.list[0]);
              commit('GET_HOURLY_FORECASTS', weatherResponse.data.hourly);
              commit('GET_WEATHER', weatherResponse.data.current);
              this.state.isLoading = false;
            }
          })).catch(error => {
            throw new Error(`Cannot get weather: ${error}`);
          });
        })
    },
  },
  getters: {
    conditionIcon: state => {
      const currentHour = dayjs().format('HH');
      if (currentHour > 6 && currentHour < 20) {
        switch (state.currentWeather.skyConditionDescription) {
          case 'extreme rain':
          case 'heavy intensity rain':
          case 'heavy intensity shower rain':
          case 'heavy shower rain and drizzle':
          case 'light intensity shower rain':
          case 'light rain':
          case 'light rain shower':
          case 'moderate rain':
          case 'moderate or heavy rain shower':
          case 'moderate rain at times':
          case 'ragged shower rain':
          case 'shower rain':
          case 'shower rain and drizzle':
          case 'torrential rain shower':
          case 'very heavy rain':
            return require('../assets/icons/rain.png');
          case 'light thunderstorm':
          case 'thunderstormw with drizzle':
          case 'thunderstormw with heavy drizzle':
          case 'thunderstorm with light drizzle':
          case 'thunderstorm with light rain':
          case 'thunderstorm with heavy rain':
          case 'thunderstorm with rain':
            return require('../assets/icons/day_rain_thunder.png');
          case 'drizzle':
          case 'drizzle rain':
          case 'heavy intensity drizzle':
          case 'heavy intensity drizzle rain':
          case 'light intensity drizzle':
          case 'light intensity drizzle rain':
            return require('../assets/icons/day_rain.png');
          case 'freezing rain':
          case 'Light rain and snow':
          case 'Light shower sleet':
          case 'Rain and snow':
          case 'Shower sleet':
          case 'Sleet':
            return require('../assets/icons/day_sleet.png');
          case 'Light shower snow':
          case 'light snow':
          case 'Snow':
          case 'snow possible':
            return require('../assets/icons/day_snow.png');
          case 'heavy thunderstorm':
          case 'ragged thunderstorm':
          case 'thunderstorm':
            return require('../assets/icons/thunder.png');
          case 'Heavy shower snow':
          case 'Heavy snow':
            return require('../assets/icons/snow.png');
          case 'mist':
            return require('../assets/icons/mist.png');
          case 'overcast clouds':
            return require('../assets/icons/overcast.png');
          case 'broken clouds':
          case 'few clouds':
          case 'scattered clouds':
            return require('../assets/icons/day_partial_cloud.png');
          case 'clear sky':
            return require('../assets/icons/day_clear.png');
          default:
            return;
        }
      } else {
        switch (state.currentWeather.skyConditionDescription) {
          case 'extreme rain':
          case 'heavy intensity rain':
          case 'heavy intensity shower rain':
          case 'heavy shower rain and drizzle':
          case 'light intensity shower rain':
          case 'light rain':
          case 'light rain shower':
          case 'moderate rain':
          case 'moderate or heavy rain shower':
          case 'moderate rain at times':
          case 'ragged shower rain':
          case 'shower rain':
          case 'shower rain and drizzle':
          case 'torrential rain shower':
          case 'very heavy rain':
            return require('../assets/icons/rain.png');
          case 'light thunderstorm':
          case 'thunderstormw with drizzle':
          case 'thunderstormw with heavy drizzle':
          case 'thunderstorm with light drizzle':
          case 'thunderstorm with light rain':
          case 'thunderstorm with heavy rain':
          case 'thunderstorm with rain':
            return require('../assets/icons/night_rain_thunder.png');
          case 'drizzle':
          case 'drizzle rain':
          case 'heavy intensity drizzle':
          case 'heavy intensity drizzle rain':
          case 'light intensity drizzle':
          case 'light intensity drizzle rain':
            return require('../assets/icons/night_rain.png');
          case 'freezing rain':
          case 'Light rain and snow':
          case 'Light shower sleet':
          case 'Rain and snow':
          case 'Shower sleet':
          case 'Sleet':
            return require('../assets/icons/night_sleet.png');
          case 'Light shower snow':
          case 'light snow':
          case 'Snow':
          case 'snow possible':
            return require('../assets/icons/night_snow.png');
          case 'heavy thunderstorm':
          case 'ragged thunderstorm':
          case 'thunderstorm':
            return require('../assets/icons/thunder.png');
          case 'Heavy shower snow':
          case 'Heavy snow':
            return require('../assets/icons/snow.png');
          case 'mist':
            return require('../assets/icons/mist.png');
          case 'overcast clouds':
            return require('../assets/icons/overcast.png');
          case 'broken clouds':
          case 'few clouds':
          case 'scattered clouds':
            return require('../assets/icons/night_partial_cloud.png');
          case 'clear sky':
            return require('../assets/icons/night_clear.png');
          default:
            return;
        }
      }
    },
    hourlyForecasts: state => {
      let hourlyData = [];

      for (let i = 0; i < state.hourlyForecastData.length; i++) {
        if (dayjs(state.hourlyForecastData[i].dt) >= dayjs().unix()) {
          hourlyData.push(state.hourlyForecastData[i]);
        }
      }

      return hourlyData.slice(0, 3).map(hourData => hourData);
    },
  },
  modules: {
  },
});
