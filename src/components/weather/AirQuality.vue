<template>
<section class="air-quality container mb-2 pb-4">
  <div class="row justify-content-around p-1 pt-2 pb-2" :class="airQualityClass">
    <p>
      UV Index: <span class="value">{{ uvIndex }}</span>
    </p>
    <p>
      Air quality: <span class="value">{{ airQuality }}</span>
    </p>
  </div>
</section>
</template>

<script>
export default {
  name: 'AirQuality',
  props: {
    airQuality: {
      type: String,
      required: true,
    },
    uvIndex: {
      type: Number,
      required: true,
    }
  },
  computed: {
    airQualityClass() {
      return {
        good: this.airQuality === 'Good',
        moderate: this.airQuality === 'Moderate',
        unhealthy: this.airQuality === 'Unhealthy'
          || this.airQuality === 'Unhealthy (sensitive groups)',
        'very-unhealthy': this.airQuality === 'Very Unhealthy',
        hazardous: this.airQuality === 'Hazardous',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.air-quality {
  color: white;
  width: 85%;

  > .row {
    border-radius: 0 0 8px 8px;
    justify-content: center;
  }

  .good,
  .moderate,
  .unhealthy-sensitive,
  .unhealthy,
  .very-unhealthy,
  .hazardous {
    border: 2px solid rgba(255, 255, 255, 0.45);
    border-top: none;
  }

  .good {
    background-color: #4CAF50;
  }

  .moderate {
    background-color: #FFEB3B;
  }

  .unhealthy {
    background-color: #FF9800;
  }

  .very-unhealthy {
    background-color: #FF5722;
  }

  .hazardous {
    background-color: #F44336;
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