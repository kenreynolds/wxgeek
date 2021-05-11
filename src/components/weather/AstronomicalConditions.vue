<template>
  <div class="container pb-4">
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
  </div>
</template>

<script>
export default {
  name: 'AstronomicalConditions',
  props: ['moonrise', 'moonset', 'sunrise', 'sunset'],
}
</script>

<style lang="scss" scoped>
.sun-data {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;

  > .col-6 {
    margin-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    width: 92px;

    > .value {
      font-weight: 700;
      margin-left: 4px;
    }

    > .wi {
      font-size: 1.25rem;
    }
  }
}
</style>
