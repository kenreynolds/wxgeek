<template>
  <div class="sun-data row">
    <p class="col-6 sunrise">
      <i class="wi wi-sunrise text-warning"></i>
      <span class="value">{{ sunrise }}</span>
    </p>
    <p class="col-6 sunset">
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
    margin: 0 auto;
    padding: 56px 0 8px 0;
    max-width: 325px;
    min-width: 275px;

    > .sunrise,
    > .sunset {
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

    > .sunrise {
        text-align: left;
      }

    > .sunset {
      text-align: right;
    }
  }

  @media
    screen and (max-width: 320px),
    screen and (max-height: 568px) {
      .sun-data {
        padding-top: 24px;
      }
  }
</style>
