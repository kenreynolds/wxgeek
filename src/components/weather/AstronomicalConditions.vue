<template>
  <div class="sun-data row">
    <p class="col-6 sunrise">
      <i class="wi wi-sunrise text-warning"></i>
      <span class="value">
        {{ formatTime(theCurrentWeather.sunrise) }}
      </span>
    </p>
    <p class="col-6 sunset">
      <i class="wi wi-sunset text-warning"></i>
      <span class="value">
        {{ formatTime(theCurrentWeather.sunset) }}
      </span>
    </p>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  dayjs.extend(localizedFormat);

  export default {
    name: 'AstronomicalConditions',
    methods: {
      formatTime(time) {
        return dayjs.unix(time).format('LT');
      },
    },
    computed: {
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sun-data {
    align-items: center;
    display: flex;
    font-size: 0.875rem;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;
    padding: 56px 4px 8px 4px;

    > .sunrise,
    > .sunset {
      margin-bottom: 8px;
      padding-left: 8px;
      padding-right: 8px;
      width: 92px;

      > .value {
        color: #9e9e9e;
        font-weight: 700;
        margin-left: 4px;
      }

      > .wi {
        font-size: 1.25rem;
      }
    }

    > .sunrise {
        text-align: left;
      }

    > .sunset {
      text-align: right;
    }
  }

  @media
    screen and (max-width: 320px),
    screen and (max-height: 568px) {
      .sun-data {
        padding-top: 24px;
      }
  }
</style>
