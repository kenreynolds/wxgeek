<template>
  <div class="page-header">
    <a class="settings-button" role="button" href="#">
      <i class="fas fa-cog"></i>
    </a>
    <p class="location">
      <i
        class="fas fa-location-arrow"
      ></i>{{ theCurrentLocation.city }}, {{ theCurrentLocation.state }}
    </p>
    <router-link
      class="site-menu"
      role="button"
      to="site-menu"
    >
      <i class="fas fa-ellipsis-v fa-sm"></i>
    </router-link>
  </div>

  <div class="row justify-content-center">
    <p class="current-date">{{ formatDate(theCurrentWeather.dt) }}</p>
  </div>
</template>

<script>
  import dayjs from 'dayjs';

  export default {
    name: 'PageHeader',
    methods: {
      formatDate(date) {
        return dayjs(date).format('dddd, MMMM D');
      },
    },
    computed: {
      theCurrentLocation() {
        return this.$store.state.currentLocation;
      },
      theCurrentWeather() {
        return this.$store.state.currentWeather;
      },
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
    > .site-menu {
      color: #757575;
      margin-right: -10px;
      width: 24px;
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
  }
</style>
