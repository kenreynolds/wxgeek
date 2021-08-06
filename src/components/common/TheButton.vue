<template>
  <button
    class="button--action"
    @click="expandObservationsPanel"
  >
    <i
      class="fas fa-chevron-circle-down fa-sm"
    ></i>
  </button>
</template>

<script>
  export default {
    name: 'TheButton',
    props: {
      isExpanded: {
        type: Boolean,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      expandObservationsPanel() {
        this.isExpanded = !this.isExpanded;
      },
    },
    computed: {
      rotateIcon(open) {
        return {
          'open': open === true,
          'closed': open === false,
        }
      },
    }
  }
</script>

<style lang="scss">
  .button--action {
    align-items: center;
    background-color: #FAFAFA;
    border: 0;
    border-radius: 100%;
    box-shadow: 0 2px 4px #BDBDBD;
    color: #757575;
    display: flex;
    height: 25px;
    justify-content: center;
    padding: 6px;
    width: 25px;

    > .fas {
      &.closed,
      &.open {
        transition: 0.15s ease-in-out;
      }

      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
