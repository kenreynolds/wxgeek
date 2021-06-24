<template>
  <section class="air-quality container mb-2 pb-4">
    <div class="row">
      <div class="col-4 p-0 pt-1 pb-1" :class="uvIndexClass">
        <p>
          UV Index: <span class="value">{{ uvIndex }}</span>
        </p>
      </div>
      <div class="col-8 p-0 pt-1 pb-1" :class="airQualityClass">
        <p>
          Air quality: <span class="value">{{ airQualityText() }}</span>
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
            return 'Moderate';
          case 3:
          case 4:
            return 'Unhealthy';
          case 5:
            return 'Very Unhealthy';
          case 6:
            return 'Hazardous';
          default:
            break;
        }
      },
    },
    computed: {
      airQualityClass() {
        return {
          good: this.airQuality === 1,
          moderate: this.airQuality === 2,
          'unhealthy-sensitive': this.airQuality === 3,
          unhealthy: this.airQuality === 4,
          'very-unhealthy': this.airQuality === 5,
          hazardous: this.airQuality === 6,
        }
      },
      uvIndexClass() {
        return {
          low: this.uvIndex >= 0 && this.uvIndex < 3,
          moderate: this.uvIndex >= 3 && this.uvIndex < 6,
          high: this.uvIndex >= 6 && this.uvIndex < 8,
          'very-high': this.uvIndex >= 8 && this.uvIndex < 11,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .air-quality {
    color: white;

    > .row {
      border-radius: 0 0 8px 8px;
    }

    > .row {
      border: 2px solid rgba(255, 255, 255, 1);
      border-top: none;
      flex-direction: row;
      justify-content: center;
      margin: 0 auto;
      max-width: 325px;
      min-width: 275px;
      position: relative;
      z-index: 0;

      > .col-4 {
        border-right: 2px solid rgba(255, 255, 255, 1);
      }
    }

    .good,
    .moderate,
    .unhealthy,
    .unhealthy-sensitive,
    .very-unhealthy,
    .hazardous {
      border-radius: 0 0 8px 0;
    }

    .low,
    .moderate,
    .high,
    .very-high {
      border-radius: 0 0 0 8px;
    }

    .good,
    .low {
      background-color: #4CAF50;
    }

    .high,
    .unhealthy-sensitive {
      background-color: #FF9800;
    }

    .unhealthy,
    .very-high {
      background-color: #F44336;
    }

    .moderate {
      background-color: #FFEB3B;
      color: #424242;
    }

    .very-unhealthy {
      background-color: #9C27B0;
    }

    .hazardous {
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