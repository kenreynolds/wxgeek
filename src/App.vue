<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 375px;
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
