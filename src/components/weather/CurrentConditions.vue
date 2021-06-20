<template>
  <div class="conditions row">
    <img
      :src="currentSkyConditionIcon"
      :alt="currentSkyCondition"
    >
    <div class="temperature">
      {{ currentTemperature }}<i class="wi wi-degrees"></i>
    </div>
  </div>

  <div class="sky-condition">
    <p>{{ currentSkyCondition }}</p>
    <p class="current-date">{{ currentDate }}</p>
  </div>
</template>

<script>
  export default {
    name: 'CurrentConditions',
    props: {
      currentDate: {
        type: String,
        required: true,
      },
      currentSkyCondition: {
        type: String,
        required: true,
      },
      currentSkyConditionIcon: {
        type: String,
        required: true,
      },
      currentTemperature: {
        type: Number,
        required: true,
      },
      isDay: {
        type: Number,
        required: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .conditions {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 24px;
    padding: 0 16px;

    > .temperature {
      font-size: 5rem;
      font-weight: 400;
      letter-spacing: -5px;
      margin-bottom: 0;
      margin-left: 12px;

      > .wi-degrees {
        margin-left: 4px;
      }
    }

    > img {
      margin-left: 12px;
      width: 100px;
    }
  }

  .sky-condition {
    align-items: center;
    color: #9e9e9e;
    display: flex;
    flex-direction: column;
    font-size: 1.375rem;
    justify-content: center;
    margin: -24px auto 0 auto;
    max-width: 325px;

    .current-date {
      font-size: 1rem;
      margin-top: -12px;
      padding: 0;
    }

    > img {
      height: 48px;
      margin-right: 5px;
      width: 48px;
    }

    > p {
      height: 48px;
      margin-bottom: 0;
      padding-top: 5px;
    }
  }
</style>