<template>
  <div class="sun-data row">
    <p class="col-6">
      <i class="wi wi-sunrise text-warning"></i>
      <span class="value">{{ sunrise }}</span>
    </p>
    <p class="col-6">
      <i class="wi wi-sunset text-warning"></i>
      <span class="value">{{ sunset }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AstronomicalConditions',
  props: {
    sunrise: {
      type: String,
      required: true,
    },
    sunset: {
      type: String,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.sun-data {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  padding: 32px 24px 8px 24px;

  > .col-6 {
    margin-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    width: 92px;

    > .value {
      color: #9e9e9e;
      font-weight: 700;
      margin-left: 4px;
    }

    > .wi {
      font-size: 1.25rem;
    }
  }
}
</style>
