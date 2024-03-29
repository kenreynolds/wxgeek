<template>
  <div class="weather">
    <TheSpinner />

    <section class="current-conditions">
      <PageHeader />
      <CurrentConditions />
      <AstronomicalConditions />
      <OtherObservations />
    </section>


    <AirQuality
      :airQuality="currentAirQuality.airQualityIndex"
      :uvIndex="roundNumeral(currentWeather.uvIndex)"
    ></AirQuality>

    <div class="section-header row">
      <a
        class="section-heading"
        :class="{ active: showHourlyForecast }"
        role="button"
        @click="shouldShowHourlyForecast"
      >
        Next 3 hours
      </a>
      <a
        class="section-heading"
        :class="{ active: showDailyForecast }"
        role="button"
        @click="shouldShowDailyForecast"
      >
        7 day forecast
      </a>
    </div>

    <HourlyForecast v-if="showHourlyForecast" />
    <DailyForecast v-if="showDailyForecast" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import AirQuality from '@/components/weather/AirQuality';
  import AstronomicalConditions from '@/components/weather/AstronomicalConditions';
  import CurrentConditions from '@/components/weather/CurrentConditions';
  import DailyForecast from '@/views/DailyForecast';
  import HourlyForecast from '@/components/weather/HourlyForecast';
  import OtherObservations from '@/components/weather/OtherObservations';
  import PageHeader from '@/components/layout/PageHeader';
  import TheSpinner from '@/components/common/TheSpinner';

  // TODO: Add placeholder view for settings menu
  // TODO: Add animation and micro-interactions

  export default {
    name: 'CurrentWeather',
    components: {
      AirQuality,
      AstronomicalConditions,
      CurrentConditions,
      DailyForecast,
      HourlyForecast,
      OtherObservations,
      PageHeader,
      TheSpinner,
    },
    data() {
      return {
        isActive: false,
        showDailyForecast: false,
        showHourlyForecast: true,
      }
    },
    methods: {
      roundNumeral(num) {
        return Math.round(num);
      },
      shouldShowDailyForecast() {
        this.showDailyForecast = true;
        this.showHourlyForecast = false;
      },
      shouldShowHourlyForecast() {
        this.showDailyForecast = false;
        this.showHourlyForecast = true;
      },
    },
    computed: {
      ...mapState(['currentAirQuality', 'currentWeather']),
    },
  };
</script>

<style lang="scss" scoped>
  .weather {
    background: linear-gradient(#01579B, #0277bd);
    display: flex;
    flex-direction: column;
    font-family: 'Red Hat Display', sans-serif;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 1rem;
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

    > .current-conditions {
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(51, 51, 51, 0.25);
      color: #757575;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 0;
      padding: 1rem;
      position: relative;
      transition: all 0.3s ease-in-out;
      width: 100%;
      z-index: 10;
    }

    > .section-header {
      align-items: baseline;
      color: white;
      font-size: 0.875rem;
      justify-content: space-between;
      margin: 0 auto 16px auto;
      padding: 0 0.875rem;
      width: 100%;

      > .section-heading {
        color: white;
        margin: 0;
        text-decoration: underline;

        &:hover {
          cursor: pointer;
          text-decoration: none;
        }

        &.active {
          font-weight: 700;
          text-decoration: none;
        }
      }
    }
  }
</style>
