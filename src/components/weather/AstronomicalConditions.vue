<template>
  <div class="container pt-5">
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

    <div class="moon-data pt-2 row">
      <p class="col-6">
        <i class="wi wi-moonrise text-info"></i>
        <span class="value">{{ moonrise }}</span>
      </p>
      <p class="col-6">
        <i class="wi wi-moonset text-info"></i>
        <span class="value">{{ moonset }}</span>
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
.moon-data,
.sun-data {
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;

  p {
    margin-bottom: 8px;
    width: 92px;

    > .value {
      font-weight: 700;
    }

    > .wi {
      font-size: 1.25rem;
    }
  }
}

.moon-data {
  i {
    margin-left: 3px;
  }

  p {
    > .value {
      margin-left: 12px;
    }
  }
}

.sun-data {
  p {
    > .value {
      margin-left: 4px;
    }
  }
}
</style>
