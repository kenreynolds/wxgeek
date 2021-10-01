<template>
  <div class="page-header">
    <a
      class="settings-button"
      role="button"
      @click="openSettingsMenu"
    >
      <i class="fas fa-cog"></i>
    </a>

    <p class="location">
      <i
        class="fas fa-location-arrow"
      ></i>{{ currentLocation.city }}, {{ currentLocation.state }}
    </p>

    <a
      class="alerts"
      role="button"
      v-if="hasAlerts"
      @click="openAlertsPanel"
    >
      <i class="fas fa-exclamation-triangle"></i>
    </a>
    <a
      class="no-alerts"
      role="button"
      v-else
      @click="openAlertsPanel"
    >
      <i class="fas fa-circle"></i>
    </a>
  </div>

  <div class="row justify-content-center">
    <p class="current-date">{{ formatDate(currentWeather.dt) }}</p>
  </div>

  <transition>
    <div class="settings-menu" v-if="showSettingsMenu">
      <div class="settings__title-bar">
        <h2>Settings</h2>
        <a role="button" @click="closeSettingsMenu">
          <i class="fas fa-times-circle"></i>
        </a>
      </div>

      <div class="settings-options">
        <span class="option selected">
          <i class="fas fa-check-circle"></i>Fahrenheit
        </span>
        <span class="option">
          <i class="far fa-circle"></i>Celsius
        </span>
      </div>
    </div>
  </transition>

  <transition>
    <div class="alerts-panel" v-if="showAlertsPanel">
      <div class="alerts__title-bar">
        <h2>Alerts</h2>
        <a role="button" @click="closeAlertsPanel">
          <i class="fas fa-times-circle"></i>
        </a>
      </div>

      <div v-if="hasAlerts">
        <h3>Alert!</h3>
      </div>

      <div v-else>
        <h3>No alerts</h3>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import dayjs from 'dayjs';

  export default {
    name: 'PageHeader',
    data() {
      return {
        hasAlerts: false,
        showAlertsPanel: false,
        showSettingsMenu: false,
      };
    },
    methods: {
      hasAlertsData() {
        if (this.getAlerts !== 'No alerts') {
          console.log(this.getAlerts);
          this.hasAlerts = true;
        } else {
          this.hasAlerts = false;
        }
      },
      closeAlertsPanel() {
        this.showAlertsPanel = false;
      },
      closeSettingsMenu() {
        this.showSettingsMenu = false;
      },
      formatDate(date) {
        return dayjs(date).format('dddd, MMMM D');
      },
      openAlertsPanel() {
        this.showAlertsPanel = true;
      },
      openSettingsMenu() {
        this.showSettingsMenu = true;
      }
    },
    computed: {
      ...mapGetters(['getAlerts']),
      ...mapState(['currentLocation', 'currentWeather']),
    },
    mounted() {
      this.hasAlertsData();
    },
  };
</script>

<style lang="scss" scoped>
  .location,
  .page-header {
    align-items: center;
    display: flex;
  }

  .page-header {
    justify-content: space-between;

    > .fa-cog,
    > .fa-ellipsis-v {
      cursor: pointer;
    }

    > .settings-button,
    > .alerts {
      color: #757575;
      margin-right: -10px;
      width: 24px;
    }

    > .alerts {
      color: #d50000;
    }

    > .location {
      color: #212121;
      font-size: 1rem;
      font-weight: 300;
      margin-bottom: 0;
      margin-left: -12px;
      margin-right: 0;

      > .fa-location-arrow {
        color: #757575;
        font-size: 0.625rem;
        margin-right: 4px;
      }
    }

    > .no-alerts {
      color: #4CAF50;
    }
  }

  .alerts-panel,
  .settings-menu {
    background-color: white;
    box-shadow: 0 4px 8px rgba(51, 51, 51, 0.25);
    height: 100%;
    left: 0;
    padding: 1rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 50;

    > .settings-options {
      display: flex;
      flex-direction: column;
      justify-content: start;

      > .option {
        align-items: center;
        display: flex;
        justify-content: start;
        margin-bottom: 1rem;

        &.selected {
          color: #4CAF50;
        }
      }
    }

    > .alerts__title-bar,
    > .settings__title-bar {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;

      .fa-times-circle {
        color: #01579B;
      }

      h2 {
        font-size: 1.5rem;
      }
    }

    .fa-check-circle,
    .far.fa-circle {
      margin-right: .5rem;
    }
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-300px);
  }

  .v-enter-to,
  .v-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .v-enter-active {
    transition: all 0.3s ease-out;
  }

  .v-leave-active {
    transition: all 0.2s ease-in;
  }
</style>
