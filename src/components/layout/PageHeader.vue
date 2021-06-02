<template>
  <div class="page-header">
    <a class="settings-button" role="button" href="#">
      <i class="fas fa-cog"></i>
    </a>
    <p class="location">
      <i class="fas fa-location-arrow"></i>{{ city }}, {{ state }}
    </p>
    <a class="site-menu" role="button" href="#">
      <i class="fas fa-ellipsis-v fa-sm"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['city', 'state'],
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
  }

  > .location {
    color: #212121;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;

    > .fa-location-arrow {
      color: #757575;
      font-size: 0.625rem;
      margin-right: 4px;
    }
  }
}
</style>
