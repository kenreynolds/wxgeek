<template>
  <div class="menu">
    <h2 class="menu-title">
      Site menu
    </h2>

    <p>Menu coming soon!</p>

    <router-link
      class="back-link"
      to="/"
    >
      <i class="fas fa-angle-left"></i>Back to Current Weather
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'TheMenu',
  }
</script>

<style lang="scss" scoped>
  .menu {
    background-color: #fff;
    height: 100vh;
    text-align: left;

    > .back-link {
      color: #03A9F4;
      padding: 1rem;
    }

    > .menu-title {
      border-bottom: 1px solid #eee;
      color: #757575;
      font-size: 1.25rem;
      padding: 1rem;
    }

    > p {
      color: #9e9e9e;
      padding: 1rem;
    }
  }
</style>