<template>
<div class="v-select">
  <div @click="isExpanded = !isExpanded" class="v-select__current">
    <span class="v-select__current-label">{{ activeOptionLabel }}</span>
    <span :class="arrowClassname"></span>
  </div>
  <ul :class="optionsClassname">
    <li
      v-for="{value, label} in optionsWithoutActive"
      :key="value"
      @click="onChangeOption(value)"
      class="v-select__option"
    >
      {{ label }}
    </li>
  </ul>
</div>
</template>

<script>
import { computed, ref, onBeforeMount } from 'vue';

export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props, ctx) {
    const activeOptionLabel = computed(() => {
      const activeOption = props.options.find((option) => option.value === props.modelValue);
      return activeOption?.label;
    });

    const optionsFilter = (option) => option.value !== props.modelValue;
    const optionsWithoutActive = computed(() => props.options.filter(optionsFilter));

    const isExpanded = ref(false);

    const optionsClassname = computed(() => ({
      'v-select__options': true,
      'v-select__options_expanded': isExpanded.value,
    }));

    const arrowClassname = computed(() => ({
      'v-select__arrow': true,
      'v-select__arrow_reversed': isExpanded.value,
    }));

    const onChangeOption = (optionValue) => {
      ctx.emit('update:modelValue', optionValue);
      isExpanded.value = false;
    };

    onBeforeMount(() => {
      if (activeOptionLabel.value || !props.options.length) return;
      const firstOptionValue = props.options[0].value;
      ctx.emit('update:modelValue', firstOptionValue);
    });

    return {
      isExpanded,
      activeOptionLabel,
      optionsClassname,
      arrowClassname,
      optionsWithoutActive,
      onChangeOption,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins/input-mixin.scss";
@import "../../assets/styles/common.scss";

.v-select {
  display: block;
  position: relative;
  .v-select__current {
    @include input();
    &-label {
      color: $light-text-color;
      user-select: none;
    }
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 6px;
    background-image: url("../../assets/images/caret.svg");
    background-position: center center;
    background-size: cover;
    right: 16px;
    top: 44%;
    transform-origin: center center;
    transition: transform 0.25s ease;
    &_reversed {
      transform: rotateZ(180deg);
    }
  }

  &__options {
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    top: 40px;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    list-style-type: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    &_expanded {
      display: flex;
    }
  }

  &__option {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 10px 5px 16px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    color: $main-text-color;
    line-height: 15px;
    user-select: none;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: lighten($light-text-color, 25%);
    }
  }
}
</style>
