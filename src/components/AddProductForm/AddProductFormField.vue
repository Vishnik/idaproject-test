<template>
  <div class="add-product-form-field">
    <label
      v-if="label"
      :class="labelClassname"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="add-product-form__input">
      <component
        :is="formFields[type]"
        :is-valid="isValid"
        :model-value="modelValue"
        @update:modelValue="onInput"
        :name="id"
        :id="id"
      ></component>
    </div>
    <div v-if="error" class="add-product-form-field__error">{{ error }}</div>
  </div>
</template>

<script>
import FormFieldTypes from './FormFieldTypes';

import VInput from '../ui/VInput.vue';
import VTextarea from '../ui/VTextarea.vue';
import VInputPrice from '../ui/VInputPrice.vue';

export default {
  name: 'AddProductFormField',
  components: {
    VInput,
    VTextarea,
    VInputPrice,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'input',
    },

    id: {
      type: String,
      required: true,
      default: '',
    },

    isValid: {
      type: Boolean || null,
      required: false,
      default: null,
    },

    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },

    error: {
      type: String,
      required: false,
      default: '',
    },

    modelValue: {
      type: String,
      required: false,
      default: '',
    },

    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, ctx) {
    const labelClassname = {
      'add-product-form-field__label': true,
      'add-product-form-field__label_required': props.isRequired,
    };

    const formFields = {
      [FormFieldTypes.INPUT]: VInput,
      [FormFieldTypes.TEXTAREA]: VTextarea,
      [FormFieldTypes.PRICE]: VInputPrice,
    };

    const onInput = (e) => {
      ctx.emit('update:modelValue', e);
    };

    return {
      labelClassname,
      formFields,
      onInput,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

.add-product-form-field {
  position: relative;
  padding-bottom: 16px;
  &__label {
    display: inline-block;
    margin-bottom: 4px;
    position: relative;
    font-family: 'Source Sans Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485E;
    &_required {
      &::after {
        position: absolute;
        content: '';
        top: 0;
        right: -4px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: $danger-color;
      }
    }
  }

  &__error {
    position: absolute;
    bottom: 2px;
    left: 0;
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: $danger-color;
  }
}
</style>
