<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
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
