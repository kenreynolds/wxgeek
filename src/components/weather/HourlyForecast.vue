<template>
<section class="hourly-forecast row">
  <div
    v-for="(hourlyForecast, index) in hourlyForecastData"
    :key="index"
  >
    <div class="hour col">
      <p class="hourly-temp">
        {{ roundNumeral(hourlyForecast.temp_f) }}<i class="wi wi-degrees"></i>
      </p>
      <img
        :src="hourlyForecast.condition.icon"
        :alt="hourlyForecast.condition.text"
      >
      <p class="pt-1">{{ formatTime(hourlyForecast.time) }}</p>
    </div>
  </div>
</section>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'HourlyForecast',
  props: {
    hourlyForecastData: {
      type: Array,
      required: true,
    }
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format('h:mm A');
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
  justify-content: space-around;
  margin: 0 8px;

  .hour {
    background-color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255,255, 255, 0.8);
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