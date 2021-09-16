<template>
  <section class="observations">
    <div class="static-observations row">
      <div class="col other-obs">
        <i class="wi wi-humidity"></i>
        <p class="value">
          {{ roundNumeral(currentWeather.humidity) }} %
        </p>
        <p class="type">
          Humidity
        </p>
      </div>

      <div class="col other-obs">
        <i class="wi wi-barometer"></i>
        <p class="value">
          {{ roundNumeral(currentWeather.pressure) }} mb
        </p>
        <p class="type">
          Pressure
        </p>
      </div>

      <div class="col other-obs">
        <i class="wi wi-strong-wind"></i>
        <p class="value">
          {{ roundNumeral(currentWeather.windSpeed) }} mph
        </p>
        <p class="type">
          Wind
        </p>
      </div>
    </div>

    <transition name="slide">
      <div class="expanded-observations row" v-if="isExpanded">
        <div class="col other-obs">
          <i class="wi wi-thermometer-internal"></i>
          <p class="value">
            {{ roundNumeral(currentWeather.dewpoint) }}<i class="wi wi-degrees"></i>
          </p>
          <p class="type">Dew point</p>
        </div>
        <div class="col other-obs">
          <i class="wi wi-horizon-alt"></i>
          <p class="value">
            {{ convertToMiles(currentWeather.visibility) }} mi
          </p>
          <p class="type">Visibility</p>
        </div>
        <div class="col other-obs">
          <i class="wi wi-strong-wind"></i>
          <p class="value">
            {{ roundNumeral(currentWeather.windGust) }} mph
          </p>
          <p class="type">Wind gust</p>
        </div>
      </div>
    </transition>

    <div class="row justify-content-center pt-3">
      <button class="expand-button" @click="expandObservationsPanel">
        <i
          class="fas fa-chevron-circle-down fa-sm"
          :class="rotateIcon"
        ></i>
      </button>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'OtherObservations',
    data() {
      return {
        isExpanded: false,
      };
    },
    methods: {
      convertToMiles(num) {
        return Math.round(num / 1609.344);
      },
      expandObservationsPanel() {
        this.isExpanded = !this.isExpanded;
      },
      roundNumeral(num) {
        return Math.round(num);
      },
    },
    computed: {
      ...mapState(['currentWeather']),
      rotateIcon() {
        return {
          'open': this.isExpanded === true,
          'closed': this.isExpanded === false,
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .expanded-observations,
  .static-observations {
    background-color: white;
    max-width: 325px;
    min-width: 275px;
  }

  .expand-button {
    align-items: center;
    background-color: #FAFAFA;
    border: 0;
    border-radius: 100%;
    box-shadow: 0 2px 4px #BDBDBD;
    color: #757575;
    display: flex;
    height: 25px;
    justify-content: center;
    padding: 6px;
    width: 25px;
    z-index: 10;

    > .fas {
      &.closed,
      &.open {
        transition: 0.15s ease-in-out;
      }

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .observations {
    background-color: white;
    box-shadow: 0 4px 8px rgba(51, 51, 51, 0.5);
    margin: 0 auto;
    padding-bottom: 1rem;
    position: relative;
    transition: all 0.5s ease-in-out;
    width: 100%;
    z-index: 5;

    > .expanded-observations {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      overflow: hidden;
      padding: 1rem 0 0;
      position: relative;
      width: 100%;
      z-index: 1;
    }

    > .static-observations {
      margin: 0 auto;
      padding-top: 1.5rem;
      position: relative;
      width: 100%;
      z-index: 10;
    }
  }

  .other-obs {
    align-items: center;
    color: #757575;
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
        margin-left: 1px;
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

  .slide-enter-active,
  .slide-leave-active {
    max-height: 500px;
    overflow: hidden;
  }

  .slide-enter-from,
  .slide-leave-to {
    max-height: 0;
  }

  .slide-enter-active {
    transition: all 1.25s ease-out;
  }

  .slide-leave-active {
    transition: all 0.25s ease-out;
  }
</style>
