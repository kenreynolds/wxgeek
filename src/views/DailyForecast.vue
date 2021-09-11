<template>
  <section class="daily-forecast">
    <DayForecast
      v-for="(day, i) in dailyForecasts"
      :day="day"
      :key="i"
    ></DayForecast>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import DayForecast from '@/components/weather/DayForecast';

  export default {
    name: 'DailyForecast',
    components: {
      DayForecast,
    },
    computed: {
      ...mapGetters(['dailyForecasts']),
    },
  }
</script>

<style lang="scss" scoped>
  .daily-forecast {
    color: #757575;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    padding: 0 0.875rem;
  }
</style>
