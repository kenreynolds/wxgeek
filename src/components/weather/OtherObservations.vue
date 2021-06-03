<template>
<div class="observations">
  <div class="row pt-3">
    <div class="col other-obs">
      <i class="wi wi-humidity"></i>
      <p class="value">
        {{ humidity }} %
      </p>
      <p class="type">
        Humidity
      </p>
    </div>

    <div class="col other-obs">
      <i class="wi wi-thermometer"></i>
      <p class="value">
        {{ feelsLike }}<i class="wi wi-degrees"></i>
      </p>
      <p class="type">
        Feels like
      </p>
    </div>

    <div class="col other-obs">
      <i class="wi wi-strong-wind"></i>
      <p class="value">
        {{ windSpeed }} mph
      </p>
      <p class="type">
        Wind
      </p>
    </div>
  </div>

  <div class="row justify-content-center pt-3">
    <i class="fas fa-chevron-circle-down"></i>
  </div>
</div>
</template>

<script>
export default {
  name: 'OtherObservations',
  props: {
    feelsLike: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.observations {
  border-top: 1px solid #e0e0e0;
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
    font-size: 1rem;
    margin-right: .25rem;
  }

  > p {
    margin-bottom: 0;
  }
}
</style>
