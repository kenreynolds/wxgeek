<template>
  <div class="weather">
    <TheSpinner
      :isLoading="isLoading"
    ></TheSpinner>

    <div class="panel">
      <section class="current-conditions">
        <PageHeader
          :city="currentLocation.city"
          :date="formatDate(theWeather.dt)"
          :state="currentLocation.state"
        ></PageHeader>

        <CurrentConditions
          :feelsLike="roundNumeral(theWeather.feels_like)"
          :skyConditionDescription="theWeatherConditions.description"
          :skyConditionText="theWeatherConditions.description"
          :skyConditionIcon="currentWeather.skyConditionIcon"
          :temperature="roundNumeral(theWeather.temp)"
        ></CurrentConditions>

        <AstronomicalConditions
          :sunrise="currentWeather.sunrise"
          :sunset="currentWeather.sunset"
        ></AstronomicalConditions>

        <OtherObservations
          :pressure="roundNumeral(theWeather.pressure)"
          :humidity="roundNumeral(theWeather.humidity)"
          :windSpeed="roundNumeral(theWeather.wind_speed)"
        ></OtherObservations>
      </section>

      <AirQuality
        :airQuality="currentWeather.airQuality"
        :uvIndex="currentWeather.uvIndex"
      ></AirQuality>

      <div class="section-header row">
        <p class="section-heading">Today</p>
        <router-link
          class="section-subtext"
          to="/daily-forecast"
        >
          5 day forecast <i class="fas fa-angle-right"></i>
        </router-link>
      </div>

      <HourlyForecast
        :hourlyForecastData="hourlyForecastData"
      ></HourlyForecast>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  import AirQuality from '@/components/weather/AirQuality';
  import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
  import CurrentConditions from '@/components/weather/CurrentConditions';
  import HourlyForecast from '@/components/weather/HourlyForecast';
  import OtherObservations from '@/components/weather/OtherObservations';
  import PageHeader from '@/components/layout/PageHeader';
  import TheSpinner from '@/components/common/TheSpinner';

  dayjs.extend(localizedFormat);

  /** TODO:
   * 1. Add placeholder views for the following:
   *   1.1. Settings menu
   * 2. Add extra observations and wire up expandable panel
   * 3. Add animation and micro-interactions
   * 4. Refactor for cleaner code as needed
   */
  export default {
    name: 'CurrentWeather',
    components: {
      AirQuality,
      AstronomicalConditions,
      CurrentConditions,
      HourlyForecast,
      OtherObservations,
      PageHeader,
      TheSpinner,
    },
    data() {
      return {
        appId: `&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`,
        baseUrl: process.env.VUE_APP_OPENWEATHERMAP_BASE_URL,
        airPollutionUrlVar: process.env.VUE_APP_AIR_POLLUTION_URL,
        oneCallWeatherUrlVar: process.env.VUE_APP_ONE_CALL_WEATHER_URL,
        reverseGeocodeUrlVar: process.env.VUE_APP_REVERSE_GEOCODE_URL,
        error: null,
        isDaytime: false,
        isLoading: true,
        hourlyForecastData: [],
        currentLocation: {
          city: '',
          state: '',
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
          sunrise: '',
          sunset: '',
          temperature: 0,
          uvIndex: 0,
          windSpeed: 0,
        },
      };
    },
    methods: {
      formatDate(date) {
        return dayjs(date).format('dddd, MMMM D');
      },
      formatTime(time) {
        return dayjs(time).format('LT');
      },
      getCurrentLocation() {
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
      },
      getWeatherData() {
        this.getCurrentLocation()
          .then(pos => {
            const lat = pos.lat;
            const lon = pos.lon;
            const airPollutionUrl = `${this.baseUrl}${this.airPollutionUrlVar}?lat=${lat}&lon=${lon}${this.appId}`;
            const oneCallWeatherUrl = `${this.baseUrl}${this.oneCallWeatherUrlVar}?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial${this.appId}`;
            const reverseGeocodeUrl = `${this.baseUrl}${this.reverseGeocodeUrlVar}?lat=${lat}&lon=${lon}${this.appId}`;

            axios.all([
              axios.get(reverseGeocodeUrl),
              axios.get(oneCallWeatherUrl),
              axios.get(airPollutionUrl),
            ])
            .then(axios.spread((geoResponse, weatherResponse, airPollutionResponse) => {
              if (geoResponse.length !== 0 && weatherResponse.length !== 0 && airPollutionResponse !== 0) {
                console.log(`Current coordinates: ${lat}, ${lon}`);
                const airPollutionData = airPollutionResponse.data.list[0];
                const currentHour = dayjs().format('HH');
                const currentLocationData = geoResponse.data[0];
                const currentWeatherData = weatherResponse.data.current;
                const currentWeatherConditionData = currentWeatherData.weather[0];
                const hourlyWeatherData = weatherResponse.data.hourly;
                let conditionIcon = '';
                let hourlyData = [];

                if (currentHour > 6 && currentHour < 20) {
                  this.isDaytime = true;
                  switch(currentWeatherConditionData.description) {
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
                      conditionIcon = require('../assets/icons/rain.png');
                      break;
                    case 'light thunderstorm':
                    case 'thunderstormw with drizzle':
                    case 'thunderstormw with heavy drizzle':
                    case 'thunderstorm with light drizzle':
                    case 'thunderstorm with light rain':
                    case 'thunderstorm with heavy rain':
                    case 'thunderstorm with rain':
                      conditionIcon = require('../assets/icons/day_rain_thunder.png');
                      break;
                    case 'drizzle':
                    case 'drizzle rain':
                    case 'heavy intensity drizzle':
                    case 'heavy intensity drizzle rain':
                    case 'light intensity drizzle':
                    case 'light intensity drizzle rain':
                      conditionIcon = require('../assets/icons/day_rain.png');
                      break;
                    case 'freezing rain':
                    case 'Light rain and snow':
                    case 'Light shower sleet':
                    case 'Rain and snow':
                    case 'Shower sleet':
                    case 'Sleet':
                      conditionIcon = require('../assets/icons/day_sleet.png');
                      break;
                    case 'Light shower snow':
                    case 'light snow':
                    case 'Snow':
                    case 'snow possible':
                      conditionIcon = require('../assets/icons/day_snow.png');
                      break;
                    case 'heavy thunderstorm':
                    case 'ragged thunderstorm':
                    case 'thunderstorm':
                      conditionIcon = require('../assets/icons/thunder.png');
                      break;
                    case 'Heavy shower snow':
                    case 'Heavy snow':
                      conditionIcon = require('../assets/icons/snow.png');
                      break;
                    case 'mist':
                      conditionIcon = require('../assets/icons/mist.png');
                      break;
                    case 'overcast clouds':
                      conditionIcon = require('../assets/icons/overcast.png');
                      break;
                    case 'broken clouds':
                    case 'few clouds':
                    case 'scattered clouds':
                      conditionIcon = require('../assets/icons/day_partial_cloud.png');
                      break;
                    case 'clear sky':
                      conditionIcon = require('../assets/icons/day_clear.png');
                      break;
                    default:
                      break;
                  }
                } else {
                  switch(currentWeatherConditionData.description) {
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
                      conditionIcon = require('../assets/icons/rain.png');
                      break;
                    case 'light thunderstorm':
                    case 'thunderstormw with drizzle':
                    case 'thunderstormw with heavy drizzle':
                    case 'thunderstorm with light drizzle':
                    case 'thunderstorm with light rain':
                    case 'thunderstorm with heavy rain':
                    case 'thunderstorm with rain':
                      conditionIcon = require('../assets/icons/night_rain_thunder.png');
                      break;
                    case 'drizzle':
                    case 'drizzle rain':
                    case 'heavy intensity drizzle':
                    case 'heavy intensity drizzle rain':
                    case 'light intensity drizzle':
                    case 'light intensity drizzle rain':
                      conditionIcon = require('../assets/icons/night_rain.png');
                      break;
                    case 'freezing rain':
                    case 'Light rain and snow':
                    case 'Light shower sleet':
                    case 'Rain and snow':
                    case 'Shower sleet':
                    case 'Sleet':
                      conditionIcon = require('../assets/icons/night_sleet.png');
                      break;
                    case 'Light shower snow':
                    case 'light snow':
                    case 'Snow':
                    case 'snow possible':
                      conditionIcon = require('../assets/icons/night_snow.png');
                      break;
                    case 'heavy thunderstorm':
                    case 'ragged thunderstorm':
                    case 'thunderstorm':
                      conditionIcon = require('../assets/icons/thunder.png');
                      break;
                    case 'Heavy shower snow':
                    case 'Heavy snow':
                      conditionIcon = require('../assets/icons/snow.png');
                      break;
                    case 'mist':
                      conditionIcon = require('../assets/icons/mist.png');
                      break;
                    case 'overcast clouds':
                      conditionIcon = require('../assets/icons/overcast.png');
                      break;
                    case 'broken clouds':
                    case 'few clouds':
                    case 'scattered clouds':
                      conditionIcon = require('../assets/icons/night_partial_cloud.png');
                      break;
                    case 'clear sky':
                      conditionIcon = require('../assets/icons/night_clear.png');
                      break;
                    default:
                      break;
                  }
                }

                this.currentLocation = {
                  city: currentLocationData.name,
                  state: currentLocationData.state,
                }

                this.currentWeather = {
                  airQuality: airPollutionData.main.aqi,
                  date: dayjs.unix(currentWeatherData.dt).format('dddd, MMMM D'),
                  feelsLike: Math.round(currentWeatherData.feels_like),
                  humidity: currentWeatherData.humidity,
                  pressure: currentWeatherData.pressure,
                  skyConditionDescription: currentWeatherConditionData.description,
                  skyConditionText: currentWeatherConditionData.main,
                  skyConditionIcon: conditionIcon,
                  sunrise: dayjs.unix(currentWeatherData.sunrise).format('LT'),
                  sunset: dayjs.unix(currentWeatherData.sunset).format('LT'),
                  temperature: Math.round(currentWeatherData.temp),
                  uvIndex: Math.round(currentWeatherData.uvi),
                  windSpeed: Math.round(currentWeatherData.wind_speed),
                };

                for (let i = 0; i < hourlyWeatherData.length; i++) {
                  if (dayjs(hourlyWeatherData[i].dt) >= dayjs().unix()) {
                    hourlyData.push(hourlyWeatherData[i]);
                  }
                }

                this.hourlyForecastData = hourlyData.slice(0, 3).map(hourData => hourData);
                this.isLoading = false;
              }
            }));
          });
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theWeather() {
        console.log(this.$store.state.weatherState);
        return this.$store.state.weatherState;
      },
      theWeatherConditions() {
        console.log(this.$store.state.weatherConditions);
        return this.$store.state.weatherConditions;
      }
    },
    mounted() {
      this.$store.dispatch('getWeather');
      this.$store.dispatch('getWeatherConditions');
      this.getWeatherData();
    },
  };
</script>

<style lang="scss" scoped>
  .weather {
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
    z-index: 5;

    .forecast-day {
      color: #fff;
      justify-content: space-between;
      padding: 14px 4px 10px 4px;

      > .temperature-panel {
        display: flex;

        > p {
          margin-left: 12px;
        }
      }

      img {
        height: 28px;
      }

      p {
        &:first-child {
          font-weight: 700;
          margin: 0;
        }
      }
    }

    .panel {
      height: 100%;

      > .current-conditions {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(51, 51, 51, 0.5);
        color: #757575;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0;
        padding: 15px;
        position: relative;
        width: 100%;
        z-index: 10;
      }

      > .section-header {
        align-items: baseline;
        justify-content: space-between;
        margin: 0 auto 16px auto;
        padding: 0 4px;
        max-width: 325px;
        min-width: 275px;

        > .section-heading {
          margin: 0;
        }

        > .section-subtext {
          color: white;

          &:hover {
            cursor: pointer;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
