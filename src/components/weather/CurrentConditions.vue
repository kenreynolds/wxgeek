<template>
  <div class="sky-condition">
    <p>{{ theCurrentWeather.skyConditionText }}</p>
  </div>

  <div class="conditions row">
    <div class="temperature-panel">
      <div class="temperature">
        {{ roundNumeral(theCurrentWeather.temperature) }}<i class="wi wi-degrees"></i>
      </div>

      <div class="feels-like">
        <p>
          Feels like: <span class="value">
            {{ roundNumeral(theCurrentWeather.feelsLike) }}<i class="wi wi-degrees"></i>
          </span>
        </p>
      </div>
    </div>

    <div class="condition-panel">
      <div class="condition-icon">
        <img
          :src="theConditionIcon"
          :alt="theCurrentWeather.skyConditionDescription"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CurrentConditions',
    methods: {
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theConditionIcon() {
        return this.$store.getters.conditionIcon;
      },
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
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
    justify-content: space-between;
    margin: -8px auto 0 auto;
    max-width: 325px;
    min-width: 275px;

    .condition-panel {
      padding-right: 12px;

      .condition-icon {
        align-items: center;
        background: linear-gradient(#81D4FA, #E1F5FE);
        border: 1px solid #81D4FA;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        height: 100px;
        margin-top: 19px;
        width: 100px;

        > img {
          margin-bottom: 0;
          opacity: 0.6;
          width: 65px;
        }
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

      > .feels-like {
        margin-top: -16px;
        text-align: left;

        .value {
          font-weight: 700;
        }

        p {
          margin-bottom: 0;
        }
      }

      > .temperature {
        font-size: 5rem;
        font-weight: 400;
        letter-spacing: -2px;
        margin-bottom: 0;
        text-align: left;

        > .wi-degrees {
          margin-left: 4px;
        }
      }
    }
  }

  .sky-condition {
    align-items: center;
    color: #9e9e9e;
    display: flex;
    font-size: 1rem;
    margin: 40px auto -4px auto;
    max-width: 325px;
    min-width: 275px;
    padding-left: 12px;
    text-transform: capitalize;

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