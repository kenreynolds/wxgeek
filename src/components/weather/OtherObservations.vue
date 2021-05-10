<template>
<div class="observations">
  <div class="row border-top border-bottom border-secondary pb-1 pt-1">
    <div class="col-6 other-obs">
      <p class="type">
        <i class="wi wi-thermometer"></i>
        Feels like
      </p>
      <p class="value">
        {{ feelsLike }}<i class="wi wi-degrees"></i>
      </p>
    </div>

    <div class="col other-obs">
      <p class="type">
        <i class="wi wi-humidity"></i>
        Humidity
      </p>
      <p class="value">
        {{ humidity }} %
      </p>
    </div>
  </div>

  <div class="row border-bottom border-secondary pb-3">
    <div class="col-6 other-obs">
      <p class="type">
        <i class="wi wi-wind-direction"></i>
        Wind
      </p>
      <p class="value">
        <span class="wind-direction">{{ windDirection }}</span>
        {{ windSpeed }} mph
      </p>
    </div>

    <div class="col other-obs">
      <p class="type">
        <i class="wi wi-barometer"></i>
        Pressure
      </p>
      <p class="value">
        {{ pressure }} mb
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'OtherObservations',
  props: [
    'feelsLike',
    'humidity',
    'pressure',
    'windDirection',
    'windSpeed'
  ],
};
</script>

<style lang="scss" scoped>
.observations {
  margin-top: 24px;
  overflow: hidden;
}

.other-obs {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  padding-left: 0;
  padding-right: 0;
  padding-top: 10px;

  > .type,
  > .value {
    padding: .25rem 0;
  }

  > .type {
    color: #9e9e9e;
    font-weight: 400;

    > .wi {
      margin-right: .25rem;
    }
  }

  > .value {
    font-size: 1.25rem;
    font-weight: 700;

    > .wind-direction {
      margin-right: 4px;
    }
  }

  > p {
    margin-bottom: 0;
  }
}
</style>
