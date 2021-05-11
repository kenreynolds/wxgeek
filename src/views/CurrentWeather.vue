<template>
<div class="weather">
  <div class="spinner" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <PageHeader
    :city="currentLocation.currentCity"
    :state="currentLocation.currentState"
    :time="currentLocation.currentTime"
  ></PageHeader>

  <div class="panel-wrapper">
    <section class="main-panel">
      <div class="row pl-0 pr-0">
        <div class="col-6 conditions">
          <div class="temperature">
            {{ currentConditions.currentTemp }}<i class="wi wi-fahrenheit"></i>
          </div>
        </div>

        <ForecastTemperatures
          :highTemp="forecastConditions.forecastHighTemp"
          :lowTemp="forecastConditions.forecastLowTemp"
        ></ForecastTemperatures>
      </div>

      <div class="row pl-4 pr-4 pt-0">
        <div class="observed-condition">
          <img
            :src="currentConditions.currentSkyConditionIcon"
            :alt="currentConditions.currentSkyCondition"
          >
          <p>{{ currentConditions.currentSkyCondition }}</p>
        </div>
      </div>

      <OtherObservations
        :feelsLike="currentConditions.currentFeelsLike"
        :humidity="currentConditions.currentHumidity"
        :pressure="currentConditions.currentPressure"
        :windDirection="currentConditions.currentWindDirection"
        :windSpeed="currentConditions.currentWindSpeed"
      ></OtherObservations>

      <div class="air-quality container mb-2 pb-4">
        <div class="row p-1" :class="airQualityClass">
          <p>
            Air quality: <span class="value">{{ currentConditions.currentAirQuality }}</span>
          </p>
        </div>
      </div>

      <AstronomicalConditions
        :sunrise="astronomyConditions.sunrise"
        :sunset="astronomyConditions.sunset"
      ></AstronomicalConditions>

      <MultiDayForecast
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
      </MultiDayForecast>
    </section>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
import ForecastTemperatures from '@/components/weather/ForecastTemperatures';
import MultiDayForecast from '@/components/weather/MultiDayForecast';
import OtherObservations from '@/components/weather/OtherObservations';
import PageHeader from '@/components/layout/PageHeader';

export default {
  name: 'CurrentWeather',
  components: {
    AstronomicalConditions,
    ForecastTemperatures,
    MultiDayForecast,
    OtherObservations,
    PageHeader,
  },
  data() {
    return {
      error: null,
      isDaytime: false,
      isLoading: true,
      fiveDayForecastData: [],
      astronomyConditions: {
        sunrise: '',
        sunset: '',
      },
      currentConditions: {
        currentAirQuality: '',
        currentFeelsLike: 0,
        currentHumidity: 0,
        currentPressure: 0,
        currentSkyCondition: '',
        currentSkyConditionIcon: '',
        currentTemp: 0,
        currentWindDirection: '',
        currentWindSpeed: 0,
      },
      currentLocation: {
        currentCity: '',
        currentState: '',
        currentTime: '',
      },
      forecastConditions: {
        forecastHighTemp: 0,
        forecastLowTemp: 0,
      },
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('ddd, M/D');
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
                console.log(`Current coordinates: ${lat}, ${lon}`);
                const currentLocation = response.data.location;
                const currentWeather = response.data.current;
                const airQualityIndex = response.data.current.air_quality;
                const forecastWeather = response.data.forecast.forecastday[0];
                const astronomicalData = forecastWeather.astro;
                let airQuality = '';

                this.isLoading = false;
                this.fiveDayForecastData = response.data.forecast.forecastday;

                if (currentLocation.is_day === 1) {
                  this.isDaytime = true;
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
                this.currentConditions = {
                  currentAirQuality: airQuality,
                  currentFeelsLike: Math.round(currentWeather.feelslike_f),
                  currentHumidity: currentWeather.humidity,
                  currentPressure: currentWeather.pressure_mb,
                  currentSkyCondition: currentWeather.condition.text,
                  currentSkyConditionIcon: currentWeather.condition.icon,
                  currentTemp: Math.round(currentWeather.temp_f),
                  currentWindDirection: currentWeather.wind_dir,
                  currentWindSpeed: Math.round(currentWeather.wind_mph),
                };
                this.currentLocation = {
                  currentCity: currentLocation.name,
                  currentState: currentLocation.region,
                  currentTime: dayjs(currentLocation.localtime).format('h:mm A'),
                };
                this.forecastConditions = {
                  forecastHighTemp: Math.round(forecastWeather.day.maxtemp_f),
                  forecastLowTemp: Math.round(forecastWeather.day.mintemp_f),
                };
              }
            }).catch(error => {
              this.error = error;
              console.log(this.error);
            });
        });
    },
  },
  computed: {
    airQualityClass() {
      return {
        good: this.currentConditions.currentAirQuality === 'Good',
        moderate: this.currentConditions.currentAirQuality === 'Moderate',
        'unhealthy-sensitive': this.currentConditions.currentAirQuality === 'Unhealthy (sensitive groups)',
        unhealthy: this.currentConditions.currentAirQuality === 'Unhealthy',
        'very-unhealthy': this.currentConditions.currentAirQuality === 'Very Unhealthy',
        hazardous: this.currentConditions.currentAirQuality === 'Hazardous',
      }
    },
  },
  mounted() {
    this.getWeatherData();
  },
};
</script>

<style lang="scss" scoped>
.weather {
  color: #757575;
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  height: 100vh;

  > .alert {
    background-color: #F8BBD0;
    border-radius: 2px;
    color: #880E4F;
  }

  > .spinner {
    align-items: center;
    background-color: #fff;
    display: flex;
    height: 100vh;
    justify-content: center;
    margin: 0 -15px 0 -15px;
    opacity: 0.95;
    position: absolute;
    width: 100%;
    z-index: 100;
  }

  .air-quality {
    color: white;
    width: 322px;

    > .row {
      border-radius: 0 0 4px 4px;
      justify-content: center;
    }

    .good {
      background-color: #4CAF50;
    }

    .moderate {
      background-color: #FFEB3B;
    }

    .unhealthy-sensitive {
      background-color: #FFC107;
    }

    .unhealthy {
      background-color: #FF9800;
    }

    .very-unhealthy {
      background-color: #FF5722;
    }

    .hazardous {
      background-color: #F44336;
    }

    p {
      font-size: 0.875rem;
      margin: 0;

      > .value {
        font-weight: 700;
      }
    }
  }

  .conditions {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.25rem;
    padding: 0;

    > .temperature {
      font-size: 5rem;
      font-weight: 400;
      margin-bottom: 0;
    }
  }

  .feels-like {
    border-radius: .25rem;
    font-weight: 400;
    margin: 0;
    margin-right: 1.25rem;
    padding-left: 0;
    padding-right: 0;
    padding-top: 1rem;

    > .heat-index,
    > .wind-chill {
      align-items: center;
      color: white;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      padding-top: 8px;
    }

    > .heat-index {
      background-color: #FFCC80;
      color: #EF6C00;
    }

    > .wind-chill {
      background-color: #90CAF9;
      color: #1565C0;
    }

    p {
      font-size: 2.5rem;
      font-weight: 400;
      margin-bottom: 0;
    }
  }

  .forecast-day {
    border-bottom: 1px solid #dee2e6;
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

  .observed-condition {
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    margin: -8px 0 14px 0;

    > img {
      height: 48px;
      margin-right: 5px;
      width: 48px;
    }

    > p {
      height: 48px;
      margin-bottom: 0;
      padding-top: 5px;
    }
  }

  .observation-time {
    display: flex;
    font-size: 2rem;
    font-weight: 300;
    justify-content: center;
    text-transform: lowercase;
  }

  .panel-wrapper {
    height: 100%;

    > .main-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;
      margin: 24px 0 0 0;
      padding-bottom: 2rem;
      width: 100%;
    }
  }
}
</style>
