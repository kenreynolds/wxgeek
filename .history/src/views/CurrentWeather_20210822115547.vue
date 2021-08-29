<template>
  <div class="weather">
    <TheSpinner />

    <div class="panel">
      <section class="current-conditions">
        <PageHeader />
        <CurrentConditions />
        <AstronomicalConditions />
        <OtherObservations />
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

      <HourlyForecast />
    </div>
  </div>
</template>

<script>
  import AirQuality from '@/components/weather/AirQuality';
  import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
  import CurrentConditions from '@/components/weather/CurrentConditions';
  import HourlyForecast from '@/components/weather/HourlyForecast';
  import OtherObservations from '@/components/weather/OtherObservations';
  import PageHeader from '@/components/layout/PageHeader';
  import TheSpinner from '@/components/common/TheSpinner';

  // TODO: Add placeholder view for the settings menu

  /** TODO:
   * 1. Add placeholder views for the following:
   *   1.1. Settings menu
   * 2. Add animation and micro-interactions
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
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theCurrentAirQuality() {
        return this.$store.state.currentAirQuality;
      },
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
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
      background: linear-gradient(#01579B, #0277bd);
      height: 100%;

      > .current-conditions {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(51, 51, 51, 0.5);
        color: #757575;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0;
        padding: 1rem;
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
