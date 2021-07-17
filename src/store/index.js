import { createStore } from 'vuex';
import axios from 'axios';

/** TODO:
 * 1. ? Add getter for currentWeather to map result ?
 */

const appId = `&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`;
const baseUrl = process.env.VUE_APP_OPENWEATHERMAP_BASE_URL;
const oneCallWeatherUrlVar = process.env.VUE_APP_ONE_CALL_WEATHER_URL;

const getCurrentLocation = () => {
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
}

export default createStore({
  state: {
    weatherState: [],
    weatherConditions: [],
  },
  mutations: {
    UPDATE_WEATHER(state, payload) {
      state.weatherState = payload;
    },
    UPDATE_WEATHER_CONDITIONS(state, payload) {
      state.weatherConditions = payload;
    },
  },
  actions: {
    getWeather({ commit }) {
      getCurrentLocation()
        .then(pos => {
          const lat = pos.lat;
          const lon = pos.lon;
          axios
            .get(`${baseUrl}${oneCallWeatherUrlVar}?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial${appId}`)
            .then(result => {
              commit('UPDATE_WEATHER', result.data.current);
            }).catch(error => {
              throw new Error(`API ${error}`);
            });
        });
    },
    getWeatherConditions({ commit }) {
      getCurrentLocation()
        .then(pos => {
          const lat = pos.lat;
          const lon = pos.lon;
          axios
            .get(`${baseUrl}${oneCallWeatherUrlVar}?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial${appId}`)
            .then(result => {
              commit('UPDATE_WEATHER_CONDITIONS', result.data.current.weather[0]);
            }).catch(error => {
              throw new Error(`API ${error}`);
            });
        });
    },
  },
  getters: {
  },
  modules: {
  },
});
