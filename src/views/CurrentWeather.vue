<template>
  <div class="weather">
    <TheSpinner
      :isLoading="showSpinner"
    ></TheSpinner>

    <div class="panel">
      <section class="current-conditions">
        <PageHeader
          :city="theCurrentLocation.city"
          :date="formatDate(theCurrentWeather.dt)"
          :state="theCurrentLocation.state"
        ></PageHeader>

        <CurrentConditions
          :feelsLike="roundNumeral(theCurrentWeather.feelsLike)"
          :skyConditionDescription="theCurrentWeather.skyConditionDescription"
          :skyConditionText="theCurrentWeather.skyConditionText"
          :skyConditionIcon="theConditionIcon"
          :temperature="roundNumeral(theCurrentWeather.temperature)"
        ></CurrentConditions>

        <AstronomicalConditions
          :sunrise="theCurrentWeather.sunrise"
          :sunset="theCurrentWeather.sunset"
        ></AstronomicalConditions>

        <OtherObservations
          :pressure="roundNumeral(theCurrentWeather.pressure)"
          :humidity="roundNumeral(theCurrentWeather.humidity)"
          :windSpeed="roundNumeral(theCurrentWeather.windSpeed)"
        ></OtherObservations>
      </section>

      <AirQuality
        :airQuality="theCurrentAirQuality.airQualityIndex"
        :uvIndex="roundNumeral(theCurrentWeather.uvIndex)"
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
        :hourlyForecastData="theHourlyForecasts"
      ></HourlyForecast>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';

  import AirQuality from '@/components/weather/AirQuality';
  import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
  import CurrentConditions from '@/components/weather/CurrentConditions';
  import HourlyForecast from '@/components/weather/HourlyForecast';
  import OtherObservations from '@/components/weather/OtherObservations';
  import PageHeader from '@/components/layout/PageHeader';
  import TheSpinner from '@/components/common/TheSpinner';

  /** TODO:
   * 1. Add placeholder views for the following:
   *   1.1. Settings menu
   * 2. Add extra observations and wire up expandable panel
   * 3. Add animation and micro-interactions
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
    methods: {
      formatDate(date) {
        return dayjs(date).format('dddd, MMMM D');
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theConditionIcon() {
        return this.$store.getters.conditionIcon;
      },
      theCurrentAirQuality() {
        return this.$store.state.currentAirQuality;
      },
      theCurrentLocation() {
        return this.$store.state.currentLocation;
      },
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
      theHourlyForecasts() {
        return this.$store.getters.hourlyForecasts;
      },
      showSpinner() {
        return this.$store.state.isLoading;
      }
    },
    mounted() {
      this.$store.dispatch('getWeather');
    },
  };
</script>

<style lang="scss" scoped>
  .weather {
    display: flex;
    flex-direction: column;
    font-family: 'Red Hat Display', sans-serif;
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
