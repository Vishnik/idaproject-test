<template>
  <div>
    <input
      :value="processedNumber"
      @input.stop="onInput"
      :class="inputClassname"
      type="text"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import NumberFormatter from '../../utils/NumberFormatter';

export default {
  name: 'VInputPrice',
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
  setup(props, ctx) {
    const inputClassname = computed(() => ({
      'v-input': true,
      'v-input_invalid': props.isValid === false,
    }));

    const processedNumber = computed(
      () => NumberFormatter.formatNumber(parseInt(props.modelValue, 10)),
    );

    const onInput = (e) => {
      const formatNumberString = e.target.value;
      const numberString = formatNumberString.replace(/\s/g, '');
      ctx.emit('update:modelValue', numberString);
    };
    return {
      inputClassname,
      processedNumber,
      onInput,
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
