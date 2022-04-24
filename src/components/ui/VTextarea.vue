<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="inputClassname"
    v-bind="$attrs"
  ></textarea>
</template>

<script>

import { computed } from 'vue';

export default {
  name: 'VTextarea',
  props: {
    isValid: {
      type: Boolean || null,
      required: false,
      default: null,
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const inputClassname = computed(() => ({
      'v-input': true,
      'v-input_invalid': props.isValid === false,
    }));
    return {
      inputClassname,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins/input-mixin";

.v-input {
  @include input();
  height: 100%;
  resize: none;
}
</style>
