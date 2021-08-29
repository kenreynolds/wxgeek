<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('getWeather');
    },
  }
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
  }

  .back-link {
    color: inherit;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
      text-decoration: none;
    }

    > .fa-angle-left {
      margin-right: 5px;
    }
  }

  .container {
    padding: 0 !important;
  }

  .row {
    &.border-secondary {
      border-color: #e0e0e0 !important;
    }
  }

  body {
    background-image: radial-gradient(
      #fff,
      #f5f5f5
    );
  }
</style>
