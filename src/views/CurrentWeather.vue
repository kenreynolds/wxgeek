<template>
  <div class="weather">
    <div class="spinner" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="panel">
      <section class="current-conditions">
        <PageHeader
          :city="currentLocation.currentCity"
          :state="currentLocation.currentState"
        ></PageHeader>

        <CurrentConditions
          :currentDate="currentConditions.currentDate"
          :currentSkyCondition="currentConditions.currentSkyCondition"
          :currentSkyConditionIcon="currentConditions.currentSkyConditionIcon"
          :currentTemperature="currentConditions.currentTemp"
          :isDay="currentConditions.isDay"
        ></CurrentConditions>

        <AstronomicalConditions
          :sunrise="astronomyConditions.sunrise"
          :sunset="astronomyConditions.sunset"
        ></AstronomicalConditions>

        <OtherObservations
          :feelsLike="currentConditions.currentFeelsLike"
          :humidity="currentConditions.currentHumidity"
          :windSpeed="currentConditions.currentWindSpeed"
        ></OtherObservations>
      </section>

      <AirQuality
        :airQuality="currentAirQualityConditions.currentAirQuality"
        :uvIndex="currentAirQualityConditions.currentUVIndex"
      ></AirQuality>

      <div class="section-header row">
        <p class="section-heading">Today</p>
        <p class="section-subtext">
          5 day forecast <i class="fas fa-angle-right"></i>
        </p>
      </div>

      <HourlyForecast
        :hourlyForecastData="hourlyForecastData"
      ></HourlyForecast>

      <!-- <MultiDayForecast
        v-for="forecastDay in fiveDayForecastData"
        :key="forecastDay.date_epoch"
      >
        <div class="forecast-day row ml-1 mr-1">
          <p>{{ formatDate(forecastDay.date) }}</p>

          <div class="temperature-panel">
            <img
              :src="forecastDay.day.condition.icon"
              :alt="forecastDay.day.condition.text"
            >
            <p class="high-temp mb-0">
              {{ Math.round(forecastDay.day.maxtemp_f) }}<i class="wi wi-degrees"></i>
            </p>
            <p class="mb-0">
              {{ Math.round(forecastDay.day.mintemp_f) }}<i class="wi wi-degrees"></i>
            </p>
          </div>
        </div>
      </MultiDayForecast> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import dayjs from 'dayjs';

  import AirQuality from '@/components/weather/AirQuality';
  import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
  import CurrentConditions from '@/components/weather/CurrentConditions';
  import HourlyForecast from '@/components/weather/HourlyForecast';
  import OtherObservations from '@/components/weather/OtherObservations';
  import PageHeader from '@/components/layout/PageHeader';

  /** TODO:
   * 1. Add placeholder views for the following:
   *   1.1. Site menu
   *   1.2. Settings menu
   *   1.3. 5 day forecast
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
    },
    data() {
      return {
        error: null,
        isDaytime: false,
        isLoading: true,
        fiveDayForecastData: [],
        hourlyForecastData: [],
        astronomyConditions: {
          sunrise: '',
          sunset: '',
        },
        currentAirQualityConditions: {
          currentAirQuality: '',
          currentUVIndex: 0,
        },
        currentConditions: {
          currentDate: '',
          currentFeelsLike: 0,
          currentHumidity: 0,
          currentPressure: 0,
          currentSkyCondition: '',
          currentSkyConditionIcon: '',
          currentTemp: 0,
          currentWindSpeed: 0,
          isDay: 0,
        },
        currentLocation: {
          currentCity: '',
          currentState: '',
        },
      };
    },

    methods: {
      formatDate(date) {
        return dayjs(date).format('ddd, M/D');
      },
      formatTime(time) {
        return dayjs(time).format('h:mm A');
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
            const apiKey = 'd1339026b3444f9390104039201811';
            const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
            const lat = pos.lat;
            const lon = pos.lon;
            const numDays = '5';

            axios
              .get(`${baseUrl}?key=${apiKey}&q=${lat},${lon}&days=${numDays}&aqi=yes&alerts=yes`)
              .then(response => {
                if (response.length !== 0) {
                  const currentHour = dayjs().format('HH');
                  const currentLocation = response.data.location;
                  const currentWeather = response.data.current;
                  const forecastWeather = response.data.forecast.forecastday[0];
                  const airQualityIndex = currentWeather.air_quality;
                  const astronomicalData = forecastWeather.astro;
                  let airQuality = '';
                  let conditionIcon = '';
                  let hourlyData = [];

                  console.log(`Current coordinates: ${lat}, ${lon}`);
                  this.isLoading = false;
                  this.fiveDayForecastData = response.data.forecast.forecastday;

                  let dayOneForecastHours = response.data.forecast.forecastday[0].hour.filter(dayOneHour => dayOneHour);
                  let dayTwoForecastHours = response.data.forecast.forecastday[1].hour.filter(dayTwoHour => dayTwoHour);
                  let forecastHours = dayOneForecastHours.concat(dayTwoForecastHours);

                  forecastHours
                    .filter(hour => hour.time)
                    .map(timeData => timeData.time);

                  for (let i = 0; i < forecastHours.length; i++) {
                    if (dayjs(forecastHours[i].time).format('HH') >= currentHour) {
                      hourlyData.push(forecastHours[i]);
                    }

                    if (dayjs(forecastHours[i].time).format('HH') >= currentHour && parseInt(currentHour) + 2 === 24) {
                      hourlyData.push(forecastHours[i]);
                      hourlyData.push(forecastHours[24]);
                    }

                    if (dayjs(forecastHours[i].time).format('HH') >= currentHour && parseInt(currentHour) + 1 === 24) {
                      hourlyData.push(forecastHours[24]);
                      hourlyData.push(forecastHours[25]);
                    }
                  }

                  this.hourlyForecastData = hourlyData.slice(0, 3).map(hourData => hourData);

                  if (currentWeather.is_day === 1) {
                    this.isDaytime = true;
                    switch(currentWeather.condition.text) {
                      case 'Heavy rain':
                      case 'Heavy rain at times':
                      case 'Light drizzle':
                      case 'Light rain':
                      case 'Light rain shower':
                      case 'Moderate rain':
                      case 'Moderate or heavy rain shower':
                      case 'Moderate rain at times':
                      case 'Torrential rain shower':
                        conditionIcon = require('../assets/icons/rain.png');
                        break;
                      case 'Blizzard':
                      case 'Blowing snow':
                      case 'Heavy snow':
                      case 'Light snow':
                      case 'Light snow showers':
                      case 'Moderate or heavy snow showers':
                      case 'Moderate snow':
                        conditionIcon = require('../assets/icons/snow.png');
                        break;
                      case 'Patchy heavy snow':
                      case 'Patchy light snow':
                      case 'Patchy moderate snow':
                      case 'Patchy snow possible':
                        conditionIcon = require('../assets/icons/day_snow.png');
                        break;
                      case 'Patchy light drizzle':
                      case 'Patchy light rain':
                      case 'Patchy rain possible':
                        conditionIcon = require('../assets/icons/day_rain.png');
                        break;
                      case 'Patchy light snow with thunder':
                        conditionIcon = require('../assets/icons/day_snow_thunder.png');
                        break;
                      case 'Moderate or heavy rain with thunder':
                      case 'Patchy light rain with thunder':
                        conditionIcon = require('../assets/icons/day_rain_thunder.png');
                        break;
                      case 'Cloudy':
                        conditionIcon = require('../assets/icons/cloudy.png');
                        break;
                      case 'Mist':
                        conditionIcon = require('../assets/icons/mist.png');
                        break;
                      case 'Moderate or heavy snow with thunder':
                        conditionIcon = require('../assets/icons/snow_thunder.png');
                        break;
                      case 'Overcast':
                        conditionIcon = require('../assets/icons/overcast.png');
                        break;
                      case 'Partly cloudy':
                        conditionIcon = require('../assets/icons/day_partial_cloud.png');
                        break;
                      case 'Sunny':
                        conditionIcon = require('../assets/icons/day_clear.png');
                        break;
                      case 'Thundery outbreaks possible':
                        conditionIcon = require('../assets/icons/thunder.png');
                        break;
                      default:
                        break;
                    }
                  } else {
                    switch(currentWeather.condition.text) {
                      case 'Heavy rain':
                      case 'Heavy rain at times':
                      case 'Light drizzle':
                      case 'Light rain':
                      case 'Light rain shower':
                      case 'Moderate rain':
                      case 'Moderate or heavy rain shower':
                      case 'Moderate rain at times':
                      case 'Torrential rain shower':
                        conditionIcon = require('../assets/icons/rain.png');
                        break;
                      case 'Blizzard':
                      case 'Blowing snow':
                      case 'Heavy snow':
                      case 'Light snow':
                      case 'Light snow showers':
                      case 'Moderate or heavy snow showers':
                      case 'Moderate snow':
                        conditionIcon = require('../assets/icons/snow.png');
                        break;
                      case 'Patchy heavy snow':
                      case 'Patchy light snow':
                      case 'Patchy moderate snow':
                      case 'Patchy snow possible':
                        conditionIcon = require('../assets/icons/night_snow.png');
                        break;
                      case 'Patchy light drizzle':
                      case 'Patchy light rain':
                      case 'Patchy rain possible':
                        conditionIcon = require('../assets/icons/night_rain.png');
                        break;
                      case 'Patchy light snow with thunder':
                        conditionIcon = require('../assets/icons/night_snow_thunder.png');
                        break;
                      case 'Moderate or heavy rain with thunder':
                      case 'Patchy light rain with thunder':
                        conditionIcon = require('../assets/icons/night_rain_thunder.png');
                        break;
                      case 'Clear':
                        conditionIcon = require('../assets/icons/night_clear.png');
                        break;
                      case 'Cloudy':
                        conditionIcon = require('../assets/icons/cloudy.png');
                        break;
                      case 'Mist':
                        conditionIcon = require('../assets/icons/mist.png');
                        break;
                      case 'Moderate or heavy snow with thunder':
                        conditionIcon = require('../assets/icons/snow_thunder.png');
                        break;
                      case 'Overcast':
                        conditionIcon = require('../assets/icons/overcast.png');
                        break;
                      case 'Partly cloudy':
                        conditionIcon = require('../assets/icons/night_partial_cloud.png');
                        break;
                      case 'Thundery outbreaks possible':
                        conditionIcon = require('../assets/icons/thunder.png');
                        break;
                      default:
                        break;
                    }
                  }

                  switch (airQualityIndex["us-epa-index"]) {
                    case 1:
                      airQuality = 'Good';
                      break;
                    case 2:
                      airQuality = 'Moderate';
                      break;
                    case 3:
                      airQuality = 'Unhealthy (sensitive groups)';
                      break;
                    case 4:
                      airQuality = 'Unhealthy';
                      break;
                    case 5:
                      airQuality = 'Very Unhealthy';
                      break;
                    case 6:
                      airQuality = 'Hazardous';
                      break;
                    default:
                      break;
                  }

                  this.astronomyConditions = {
                    sunrise: astronomicalData.sunrise,
                    sunset: astronomicalData.sunset,
                  };
                  this.currentAirQualityConditions = {
                    currentAirQuality: airQuality,
                    currentUVIndex: currentWeather.uv,
                  };
                  this.currentConditions = {
                    currentDate: dayjs(currentLocation.localtime).format('dddd, MMMM D'),
                    currentFeelsLike: Math.round(currentWeather.feelslike_f),
                    currentHumidity: currentWeather.humidity,
                    currentPressure: currentWeather.pressure_mb,
                    currentSkyCondition: currentWeather.condition.text,
                    currentSkyConditionIcon: conditionIcon,
                    currentTemp: Math.round(currentWeather.temp_f),
                    currentWindSpeed: Math.round(currentWeather.wind_mph),
                    isDay: currentWeather.is_day,
                  };
                  this.currentLocation = {
                    currentCity: currentLocation.name,
                    currentState: currentLocation.region,
                  };
                }
              }).catch(error => {
                this.error = error;
                console.log(this.error);
              });
          });
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    mounted() {
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

    > .spinner {
      align-items: center;
      background-color: #fff;
      display: flex;
      height: 100vh;
      justify-content: center;
      left: 15px;
      margin: 0 -15px 0 -15px;
      position: absolute;
      width: 100%;
      z-index: 100;
    }

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
        border-radius: 0 0 6px 6px;
        box-shadow: 0 4px 8px rgba(51, 51, 51, 0.5);
        color: #757575;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0;
        padding: 15px;
        position: relative;
        width: 100%;
      }

      > .section-header {
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        padding: 0 8px;
        max-width: 300px;
        min-width: 275px;
      }
    }
  }
</style>
