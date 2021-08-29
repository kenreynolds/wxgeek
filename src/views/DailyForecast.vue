<template>
  <section class="daily-forecast">
    <DayForecast
      v-for="(day, i) in theDailyForecast"
      :day="day"
      :key="i"
    ></DayForecast>
  </section>
</template>

<script>
  import DayForecast from '@/components/weather/DayForecast';

  export default {
    name: 'DailyForecast',
    components: {
      DayForecast,
    },
    computed: {
      theDailyForecast() {
        return this.$store.getters.dailyForecasts;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .daily-forecast {
    color: #757575;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;
    padding: 0 4px;
  }
</style>
