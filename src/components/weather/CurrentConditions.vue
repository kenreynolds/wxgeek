<template>
  <div class="sky-condition">
    <p>{{ skyConditionText }}</p>
  </div>

  <div class="conditions row">
    <div class="temperature-panel">
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
</template>

<script>
  export default {
    name: 'CurrentConditions',
    props: {
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
    justify-content: space-between;
    margin: -8px auto 8px auto;
    max-width: 325px;
    min-width: 275px;

    .condition-icon {
      align-items: center;
      background: linear-gradient(#81D4FA, #E1F5FE);
      border: 1px solid #81D4FA;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      height: 100px;
      margin-top: 19px;
      width: 100px;

      > img {
        margin-bottom: 0;
        opacity: 0.6;
        width: 65px;
      }
    }

    .current-date {
      font-size: 1rem;
      margin-bottom: -1rem;
      padding: 0;
    }

    .temperature-panel {
      display: flex;
      flex-direction: column;
      padding-left: 8px;

      > .feels-like {
        margin-top: -16px;
        text-align: left;

        .value {
          font-weight: 700;
        }

        p {
          margin-bottom: 0;
        }
      }

      > .temperature {
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
  }

  .sky-condition {
    align-items: center;
    color: #9e9e9e;
    display: flex;
    font-size: 1rem;
    margin: 64px auto -4px auto;
    max-width: 325px;
    min-width: 275px;
    padding-left: 8px;
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