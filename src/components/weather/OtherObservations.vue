<template>
  <div class="observations">
    <div class="row pt-3">
      <div class="col other-obs">
        <i class="wi wi-humidity"></i>
        <p class="value">
          {{ roundNumeral(theCurrentWeather.humidity) }} %
        </p>
        <p class="type">
          Humidity
        </p>
      </div>

      <div class="col other-obs">
        <i class="wi wi-barometer"></i>
        <p class="value">
          {{ roundNumeral(theCurrentWeather.pressure) }} mb
        </p>
        <p class="type">
          Pressure
        </p>
      </div>

      <div class="col other-obs">
        <i class="wi wi-strong-wind"></i>
        <p class="value">
          {{ roundNumeral(theCurrentWeather.windSpeed) }} mph
        </p>
        <p class="type">
          Wind
        </p>
      </div>
    </div>

    <div class="row justify-content-center pt-3">
      <button class="expand-button">
        <i class="fas fa-chevron-circle-down fa-sm"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OtherObservations',
    methods: {
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .expand-button {
    align-items: center;
    background-color: #FAFAFA;
    border: 0;
    border-radius: 50%;
    box-shadow: 0 2px 4px #BDBDBD;
    color: #757575;
    display: flex;
    height: 25px;
    justify-content: center;
    width: 25px;
  }

  .observations {
    border-top: 1px solid #e0e0e0;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;
  }

  .other-obs {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;

    > .type,
    > .value {
      font-size: 0.875rem;
    }

    > .type {
      color: #9e9e9e;
      font-weight: 400;
    }

    > .value {
      font-weight: 700;
      padding-top: .5rem;

      > .wi-degrees {
        font-size: 1rem;
      }

      > .wind-direction {
        margin-right: 4px;
      }
    }

    > .wi {
      color: #9e9e9e;
      font-size: 1.25rem;
      margin-right: .25rem;
    }

    > p {
      margin-bottom: 0;
    }
  }
</style>
