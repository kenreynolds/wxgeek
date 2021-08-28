<template>
  <section class="air-quality container">
    <div class="row">
      <div class="col-4 p-0 pt-1 pb-1" :class="uvIndexClass">
        <p>
          UV Index: <span class="value">
            {{ uvIndex }}
          </span>
        </p>
      </div>
      <div class="col-8 p-0 pt-1 pb-1" :class="airQualityClass">
        <p>
          Air quality: <span class="value">
            {{ airQualityText() }}
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AirQuality',
    props: {
      airQuality: {
        type: Number,
        required: true,
      },
      uvIndex: {
        type: Number,
        required: true,
      }
    },
    methods: {
      airQualityText() {
        switch (this.airQuality) {
          case 1:
            return 'Good';
          case 2:
            return 'Fair';
          case 3:
            return 'Moderate';
          case 4:
            return 'Poor';
          case 5:
            return 'Very Poor';
          default:
            break;
        }
      },
    },
    computed: {
      airQualityClass() {
        return {
          'aqi-good': this.airQuality === 1,
          'aqi-fair': this.airQuality === 2,
          'aqi-moderate': this.airQuality === 3,
          'aqi-poor': this.airQuality === 4,
          'aqi-very-poor': this.airQuality === 5,
        }
      },
      uvIndexClass() {
        return {
          'uvi-low': this.uvIndex >= 0 && this.uvIndex <= 2,
          'uvi-moderate': this.uvIndex >= 3 && this.uvIndex <= 5,
          'uvi-high': this.uvIndex >= 6 && this.uvIndex <= 7,
          'uvi-very-high': this.uvIndex >= 8 && this.uvIndex <= 10,
          'uvi-extreme': this.uvIndex >= 11
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .air-quality {
    color: white;
    margin-bottom: 1.5rem;

    > .row {
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 0 0 8px 8px;
      border-top: none;
      flex-direction: row;
      justify-content: center;
      margin: 0 auto;
      max-width: 325px;
      min-width: 275px;
      overflow: hidden;
      position: relative;
      z-index: 0;

      > .col-4 {
        border-right: 2px solid rgba(255, 255, 255, 1);
      }
    }

    .aqi-good,
    .uvi-low {
      background-color: #4CAF50;
    }

    .aqi-fair,
    .uvi-moderate {
      background-color: #FFEB3B;
      color: #424242;
    }

    .aqi-moderate,
    .uvi-high {
      background-color: #FF9800;
    }

    .aqi-poor,
    .uvi-very-high {
      background-color: #F44336;
    }

    .aqi-very-poor,
    .uvi-extreme {
      background-color: #880E4F;
    }

    p {
      font-size: 0.875rem;
      margin: 0;

      > .value {
        font-weight: 700;
      }
    }
  }
</style>