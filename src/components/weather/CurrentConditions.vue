<template>
  <div class="conditions row">
    <div class="condition-icon">
      <img
        :src="conditionIcon"
        :alt="currentWeather.skyConditionDescription"
      >
    </div>
    <div class="temperature-panel">
      <div class="temperature">
        {{ roundNumeral(currentWeather.temperature) }}<i class="wi wi-degrees"></i>
      </div>
    </div>
  </div>

  <div class="sky-condition">
    <p>
      {{ capitalizeConditionText(currentWeather.skyConditionText) }}
    </p>
  </div>

  <div class="feels-like">
    <p>
      Feels like: <span class="value">
        {{ roundNumeral(currentWeather.feelsLike) }}<i class="wi wi-degrees"></i>
      </span>
    </p>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'CurrentConditions',
    methods: {
      capitalizeConditionText(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      ...mapGetters(['conditionIcon']),
      ...mapState(['currentWeather']),
    }
  }
</script>

<style lang="scss" scoped>
  .current-date,
  .feels-like {
    color: #9e9e9e;
  }

  .feels-like,
  .temperature {
    font-family: 'Red Hat Display', sans-serif;
  }

  .conditions {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 1rem auto 0.5rem;
    max-width: 325px;
    min-width: 275px;

    > .condition-icon {
      align-items: center;
      background: linear-gradient(#81D4FA, #E1F5FE);
      border: 1px solid #81D4FA;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      height: 75px;
      margin-top: 19px;
      width: 75px;

      > img {
        margin-bottom: 0;
        opacity: 0.6;
        width: 50px;
      }
    }

    .current-date {
      font-size: 1rem;
      margin-bottom: -1rem;
      padding: 0;
    }

    .temperature-panel {
      display: flex;
      flex-direction: column;
      padding-left: 12px;

      > .temperature {
        color: #757575;
        font-size: 5rem;
        font-weight: 400;
        height: 105px;
        letter-spacing: -2px;
        margin-bottom: 0;
        text-align: left;

        > .wi-degrees {
          margin-left: 4px;
        }
      }
    }
  }

  .feels-like {
    font-size: 0.875rem;
    text-align: center;

    .value {
      font-weight: 700;
    }

    p {
      margin-bottom: 0;
    }
  }

  .sky-condition {
    align-items: center;
    color: #9e9e9e;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;

    > img {
      height: 48px;
      margin-right: 5px;
      width: 48px;
    }

    > p {
      margin-bottom: 0;
    }
  }

  @media
    screen and (max-width: 320px),
    screen and (max-height: 568px) {
      .sky-condition {
        margin-top: 0;
      }

      .conditions {
        > .temperature {
          font-size: 4.5rem;
        }

        > img {
          width: 90px;
        }
      }
  }
</style>