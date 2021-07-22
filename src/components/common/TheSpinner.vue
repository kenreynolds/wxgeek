<template>
  <div class="spinner" v-if="showSpinner">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TheSpinner',
    computed: {
      showSpinner() {
        return this.$store.state.isLoading;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .spinner {
    align-items: center;
    background-color: #fff;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 15px;
    margin: 0 -15px 0 -15px;
    position: absolute;
    width: 100%;
    z-index: 100;
  }
</style>
