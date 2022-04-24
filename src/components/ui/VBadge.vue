<template>
<button :class="badgeClassname">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: 'VBadge',
  props: {
    type: {
      type: String,
      required: false,
      default: 'success',
    },
  },
  setup(props) {
    const badgeClassname = {
      'v-badge': true,
      'v-badge_type-success': props.type === 'success',
      'v-badge_type-danger': props.type === 'danger',
    };

    return {
      badgeClassname,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/vars";
.v-badge {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  outline: none;
  transition: background-color 0.25s ease;
  &_type-success {
    background-color: $success-color;
    &:hover,
    &:focus {
      background-color: lighten($success-color, 5%);
    }
    &:active {
      background-color: darken($success-color, 5%);
    }
  }

  &_type-danger {
    background-color: $danger-color;
    &:hover,
    &:focus {
      background-color: lighten($danger-color, 5%);
    }
    &:active {
      background-color: darken($danger-color, 5%);
    }
  }
}
</style>
