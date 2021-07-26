<template>
  <div class="row page-header">
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

  <div class="daily-forecast">
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
        <span>
          {{ day.weather[0].main }}
        </span>
      </div>

      <div class="temperatures">
        <span class="high">
          <i class="fas fa-long-arrow-alt-up"></i>{{ roundNumeral(day.temp.max) }}
        </span>
        <span class="low">
          <i class="fas fa-long-arrow-alt-down"></i>{{ roundNumeral(day.temp.min) }}
        </span>
      </div>

      <div
        class="expanded-forecast row"
        v-if="isExpanded"
      >
        Additional forecast information...
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';

  export default {
    name: 'DailyForecast',
    data() {
      return {
        isExpanded: false,
      };
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

    > .day {
      align-items: center;
      border-bottom: 2px solid #0277bd;
      display: flex;
      justify-content: space-between;
      padding: 1.25rem .75rem;

      &:last-child {
        border: 0;
      }

      > .condition {
        align-items: center;
        display: flex;
        width: 80px;

        > .icon {
          margin-right: 0.5rem;
          width: 24px;
        }

        img {
          color: #757575;
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
          color: #B3E5FC;
          margin-right: 2px;
        }
      }
    }

    > .row {
      margin: 0;
    }

    > h1 {
      margin-bottom: 16px;
    }
  }

  .expanded-forecast {
    padding: 1rem 1rem 0;
  }

  .page-header {
    align-items: center;
    color: #757575;
    display: flex;
    justify-content: space-between;
    margin: 0 1rem 3.5rem 1rem;
    padding-top: 1rem;

    > .back-link {
      margin: 0;

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
