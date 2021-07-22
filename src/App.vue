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
    background-color: #0277bd;
    padding: 0 !important;
  }

  .row {
    &.border-secondary {
      border-color: #e0e0e0 !important;
    }
  }

  .section-heading {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .section-subtext {
    font-size: 0.875rem;
  }

  body {
    background-image: radial-gradient(
      #fff,
      #f5f5f5
    );
  }
</style>
