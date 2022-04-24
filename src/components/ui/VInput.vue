<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="inputClassname"
    type="text"
    v-bind="$attrs"
  >
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'VInput',
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
  @include input
}
</style>
