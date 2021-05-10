<template>
<div class="col forecast-temperatures">
  <p class="high">
    Hi: {{ highTemp }}<i class="wi wi-degrees"></i>
  </p>
  <p class="low">
    Lo: {{ lowTemp }}<i class="wi wi-degrees"></i>
  </p>
</div>
</template>

<script>
export default {
  name: 'ForecastTemperatures',
  props: ['highTemp', 'lowTemp'],
};
</script>

<style lang="scss" scoped>
.forecast-temperatures {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  font-size: 1.75rem;
  font-weight: 300;
  justify-content: flex-end;
  margin-right: 30px;
  max-height: 172px;
  padding-bottom: 16px;
  padding-left: 0;
  padding-right: 0;
  padding-top: 10px;

  > .high {
    color: #e65100;
  }

  > .low {
    color: #2196f3;
  }

  > p {
    margin-bottom: 0;
  }
}
</style>
