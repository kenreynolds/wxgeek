<template>
  <div class="day row">
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
        return require(`../../assets/icons/white/${icon}.svg`);
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
    border-bottom: 2px solid #0277bd;
    display: flex;
    justify-content: space-between;
    padding: 1.25rem .75rem .5rem;

    > .condition,
    > .date,
    > .temperatures {
      padding-bottom: 0.75rem;
    }

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
      align-items: center;
      display: flex;
      font-weight: 700;
      justify-content: space-between;
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

  .expanded-forecast {
    padding: 0 1rem 0.75rem;
    width: 100%;
  }

  .row {
    margin: 0;
  }
</style>
