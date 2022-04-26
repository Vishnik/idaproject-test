<template>
  <teleport to="#notification">
    <div v-if="isShow" class="v-notification">
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'VNotification',
  props: {
    isShow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-notification {
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px 10px 15px 10px;
  }
</style>
