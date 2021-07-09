<template>
  <div class="conditions row">
    <div class="d-flex flex-column">
      <p class="current-date">{{ date }}</p>

      <div class="temperature">
        {{ temperature }}<i class="wi wi-degrees"></i>
      </div>

      <div class="feels-like">
        <p>
          Feels like: <span class="value">
            {{ feelsLike }}<i class="wi wi-degrees"></i>
          </span>
        </p>
      </div>
    </div>

    <div class="condition-icon">
      <img
        :src="skyConditionIcon"
        :alt="skyConditionDescription"
      >
    </div>
  </div>

  <div class="sky-condition">
    <p>{{ skyConditionText }}</p>
  </div>
</template>

<script>
  export default {
    name: 'CurrentConditions',
    props: {
      date: {
        type: String,
        required: true,
      },
      feelsLike: {
        type: Number,
        required: true,
      },
      skyConditionDescription: {
        type: String,
        required: true,
      },
      skyConditionText: {
        type: String,
        required: true,
      },
      skyConditionIcon: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .current-date,
  .feels-like {
    color: #9e9e9e;
  }

  .conditions {
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin: 64px auto 8px auto;
    max-width: 325px;
    min-width: 275px;

    .condition-icon {
      align-items: center;
      background-color: #E1F5FE;
      border: 1px solid #B3E5FC;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      height: 125px;
      width: 125px;

      > img {
        margin-bottom: 0;
        opacity: 0.6;
        width: 75px;
      }
    }

    .current-date {
      font-size: 1rem;
      margin-bottom: -1rem;
      padding: 0;
    }

    .feels-like {
      margin-top: -16px;
      text-align: left;

      .value {
        font-weight: 700;
      }

      p {
        margin-bottom: 0;
      }
    }

    .temperature {
      font-size: 5rem;
      font-weight: 400;
      letter-spacing: -5px;
      margin-bottom: 0;
      text-align: left;

      > .wi-degrees {
        margin-left: 4px;
      }
    }
  }

  .sky-condition {
    align-items: center;
    color: #bdbdbd;
    display: flex;
    font-size: 1rem;
    margin: 0 auto;
    max-width: 325px;
    min-width: 275px;
    padding-left: 10px;
    text-transform: capitalize;

    > img {
      height: 48px;
      margin-right: 5px;
      width: 48px;
    }

    > p {
      margin-bottom: 0;
    }
  }

  @media
    screen and (max-width: 320px),
    screen and (max-height: 568px) {
      .sky-condition {
        margin-top: 0;
      }

      .conditions {
        > .temperature {
          font-size: 4.5rem;
        }

        > img {
          width: 90px;
        }
      }
  }
</style>