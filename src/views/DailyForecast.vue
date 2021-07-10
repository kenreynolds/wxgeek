<template>
  <div class="daily-forecast">
    <h1>
      Coming Soon!
    </h1>

    <p>
      We're currently building the 5-Day Forecast page and will launch it soon.
    </p>

    <router-link
      class="back-link"
      to="/"
    >
      <i class="fas fa-angle-left"></i>Back to Current Weather
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'DailyForecast',
  }
</script>

<style lang="scss" scoped>
  .daily-forecast {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding: 24px;

    > .back-link {
      color: white;
    }

    > h1 {
      margin-bottom: 16px;
    }
  }
</style>
