<template>
  <div class="daily-forecast">
    <DayForecast
      v-for="(day, i) in theDailyForecast"
      :day="day"
      :key="i"
    ></DayForecast>
  </div>
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
    background: linear-gradient(#01579B, #0277bd);
    height: 100vh;
    margin: 0 auto;
    min-width: 275px;
  }

  .page-header {
    align-items: center;
    color: #757575;
    display: flex;
    justify-content: space-between;
    margin: 0 1rem 2.5rem 1rem;
    padding-top: 1rem;

    > .back-link {
       align-items: center;
      background-color: #FAFAFA;
      border: 0;
      border-radius: 100%;
      box-shadow: 0 2px 4px #BDBDBD;
      color: #757575;
      display: flex;
      height: 25px;
      justify-content: center;
      margin: 0;
      padding: 6px;
      width: 25px;

      &:hover {
        color: inherit;
      }
    }

    > .site-menu {
      color: #757575;
      margin-right: -10px;
      width: 24px;
    }

    .fa-calendar-alt {
      margin-right: 8px;
    }
  }
</style>
