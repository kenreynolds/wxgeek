<template>
  <div class="day row mb-3">
    <div class="date">
      {{ formatDay(day.dt) }}
    </div>

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
  </div>
</template>

<script>
  import dayjs from 'dayjs';

  export default {
    name: 'DayForecast',
    props: ['day'],
    methods: {
      displayIcon(icon) {
        return require(`../../assets/icons/gray/${icon}.svg`);
      },
      formatDay(date) {
        return dayjs.unix(date).format('ddd');
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .day {
    align-items: center;
    background-color: #B3E5FC;
    border: 1px solid #E1F5FE;
    border-radius: 8px;
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding-left: 12px;

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
      font-weight: 700;
      text-align: left;
      width: 32px;
    }

    .temperatures {
      align-items: center;
      background-color: white;
      border-radius: 0 8px 8px 0;
      display: flex;
      font-weight: 700;
      height: 59px;
      justify-content: space-around;
      padding: 0 8px;
      width: 96px;

      > .high {
        margin-right: 12px;
      }

      .fas {
        margin-right: 2px;
        opacity: 0.75;
      }
    }
  }

  .expanded-forecast {
    padding: 0 1rem 0.75rem;
    width: 100%;
  }

  .row {
    margin: 0;
  }
</style>
