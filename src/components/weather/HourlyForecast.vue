<template>
  <section class="hourly-forecast row">
    <div
      v-for="(hourlyForecast, index) in hourlyForecastData"
      :key="index"
    >
      <div class="hour col">
        <p class="hourly-temp">
          {{ roundNumeral(hourlyForecast.temp) }}<i class="wi wi-degrees"></i>
        </p>
        <img
          :src="displayIcon(hourlyForecast.weather[0].icon)"
          :alt="hourlyForecast.weather[0].description"
        >
        <p class="pt-1">{{ formatTime(hourlyForecast.dt) }}</p>
      </div>
    </div>
  </section>
</template>

<script>
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  dayjs.extend(localizedFormat);

  export default {
    name: 'HourlyForecast',
    props: {
      hourlyForecastData: {
        type: Array,
        required: true,
      }
    },
    methods: {
      displayIcon(icon) {
        return require(`../../assets/icons/${icon}.svg`);
      },
      formatTime(time) {
        return dayjs.unix(time).format('LT');
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .hourly-forecast {
    color: #757575;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;
    padding: 0 4px;

    .hour {
      background-color: #B3E5FC;
      border: 1px solid #E1F5FE;
      border-radius: 8px;
      padding: 12px;

      .hourly-temp {
        font-size: 1rem;
        font-weight: 700;

        > .wi-degrees {
          margin-left: 2px;
        }
      }

      > img {
        width: 35px;
      }

      > p {
        font-size: 0.875rem;
        margin: 0;
      }
    }
  }
</style>