<template>
  <section class="hourly-forecast row flex-column">
    <div
      class="mb-3"
      v-for="(hourlyForecast, index) in hourlyForecasts"
      :key="index"
    >
      <div class="hour col">
        <div class="hourly-temp__block">
          <p class="time">{{ formatTime(hourlyForecast.dt) }}</p>
          <p class="hourly-temp">
            {{ roundNumeral(hourlyForecast.temp) }}<i class="wi wi-degrees"></i>
          </p>
        </div>
        <p class="pop">
          Chance of rain: <span class="value">{{ hourlyForecast.pop }}%</span>
        </p>
        <img
          :src="displayIcon(hourlyForecast.weather[0].icon)"
          :alt="hourlyForecast.weather[0].description"
        >
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  dayjs.extend(localizedFormat);

  export default {
    name: 'HourlyForecast',
    methods: {
      displayIcon(icon) {
        return require(`../../assets/icons/gray/${icon}.svg`);
      },
      formatTime(time) {
        return dayjs.unix(time).format('LT');
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      ...mapGetters(['hourlyForecasts']),
    },
  }
</script>

<style lang="scss" scoped>
  .hourly-forecast {
    color: #757575;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 0.875rem;
    width: 100%;

    .hour {
      align-items: center;
      background-color: #B3E5FC;
      border: 1px solid #E1F5FE;
      border-radius: 8px;
      display: flex;
      height: 60px;
      padding: 12px 10px 12px 0;

      > .hourly-temp__block {
        align-items: center;
        background-color: white;
        border-radius: 8px 0 0 8px;
        display: flex;
        flex-direction: column;
        height: 60px;
        justify-content: space-around;
        width: 88px;

        .hourly-temp {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1rem;
          margin-bottom: 12px;

          > .wi-degrees {
            margin-left: 2px;
          }
        }

        > .time {
          font-size: 0.75rem;
          margin-bottom: 2px;
          margin-top: 8px;
        }
      }

      > .pop {
        margin-left: 8px;
      }

      > img {
        position: absolute;
        right: 8px;
        width: 35px;
      }

      > p {
        font-size: 0.875rem;
        margin: 0;
      }

      .value {
        font-weight: 700;
      }
    }
  }
</style>