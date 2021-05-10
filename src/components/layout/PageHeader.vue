<template>
  <div class="page-header">
    <p class="time mb-0">{{ time }}</p>
    <p class="location">{{ city }}, {{ state }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['city', 'state', 'time'],
};
</script>

<style lang="scss" scoped>
.page-header {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 0;
  padding: 0;

  > .location {
    color: #212121;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 0;
  }

  > .time {
    color: #757575;
    font-size: 1.5rem;
  }

  > p {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
