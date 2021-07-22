<template>
  <div class="daily-forecast">
    <div class="row page-header mb-5 pt-3">
      <router-link
        class="back-link"
        to="/"
      >
        <i class="fas fa-chevron-circle-left fa-lg"></i>
      </router-link>

      <span>
        <i class="far fa-calendar-alt fa-lg"></i>7 day forecast
      </span>

      <router-link
        class="site-menu"
        role="button"
        to="site-menu"
      >
        <i class="fas fa-ellipsis-v fa-sm"></i>
      </router-link>
    </div>

    <CurrentConditions />

    <div
      class="day row"
      v-for="(day, index) in theDailyForecast"
      :key="index"
    >
      <div class="date">{{ formatDay(day.dt) }}</div>

      <div class="condition">
        <div class="icon">
          <img
            :src="displayIcon(day.weather[0].icon)"
            :alt="day.weather[0].description"
          />
        </div>
        <span class="text">{{ day.weather[0].main }}</span>
      </div>

      <div class="temperatures">
        <span class="high">
          <i class="fas fa-long-arrow-alt-up"></i>{{ roundNumeral(day.temp.max) }}
        </span>
        <span class="low">
          <i class="fas fa-long-arrow-alt-down"></i>{{ roundNumeral(day.temp.min) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import CurrentConditions from '@/components/weather/CurrentConditions';

  export default {
    name: 'DailyForecast',
    components: {
      CurrentConditions,
    },
    methods: {
      displayIcon(icon) {
        return require(`../assets/icons/white/${icon}.svg`);
      },
      formatDay(date) {
        return dayjs.unix(date).format('ddd');
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theDailyForecast() {
        return this.$store.state.dailyForecastData;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .daily-forecast {
    height: 100vh;

    > .day {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 16px 0;

      > .condition {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 80px;

        > .icon {
          width: 24px;
        }

        img {
          color: white;
          width: 24px;
        }
      }

      .date {
        text-align: left;
        width: 32px;
      }

      .temperatures {
        font-weight: 700;
        width: 85px;

        > .high {
          margin-right: 12px;
        }

        .fas {
          margin-right: 2px;
          opacity: 0.75;
        }
      }
    }

    > .page-header {
      align-items: center;
      display: flex;
      justify-content: space-between;

      > .site-menu {
        color: white;
        margin-right: -10px;
        width: 24px;
      }

      .fa-calendar-alt {
        margin-right: 8px;
      }
    }

    > .row {
      margin: 0 15px;
    }

    .back-link {
      color: white;
      margin: 0;
    }

    > h1 {
      margin-bottom: 16px;
    }
  }
</style>
