<template>
<button class="v-btn" v-bind="$attrs">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: 'VButton',
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common.scss";

.v-btn {
  box-sizing: border-box;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 11px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #fff;
  background-color: $success-color;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  &[disabled] {
    background-color: #eeeeee;
    color: $light-text-color;
    cursor: not-allowed;
  }
  &:not([disabled]) {
    &:hover,
    &:focus {
      background-color: lighten($success-color, 5%);
    }

    &:active {
      background-color: darken($success-color, 5%);
    }
  }
}
</style>
