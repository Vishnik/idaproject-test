<template>
  <form @submit.stop.prevent="onSubmit" class="add-product-form">
    <AddProductFormField
      :id="form.title.name"
      :is-valid="form.title.isValid"
      v-model="form.title.value"
      :error="form.title.error"
      :label="form.title.label"
      :is-required="form.title.required"
      :type="form.title.type"
    />
    <AddProductFormField
      :id="form.description.name"
      :is-valid="form.description.isValid"
      v-model="form.description.value"
      :error="form.description.error"
      :label="form.description.label"
      :is-required="form.description.required"
      :type="form.description.type"
    />
    <AddProductFormField
      :id="form.image.name"
      :is-valid="form.image.isValid"
      v-model="form.image.value"
      :error="form.image.error"
      :label="form.image.label"
      :is-required="form.image.required"
      :type="form.image.type"
    />
    <AddProductFormField
      :id="form.price.name"
      :is-valid="form.price.isValid"
      v-model="form.price.value"
      :error="form.price.error"
      :label="form.price.label"
      :is-required="form.price.required"
      :type="form.price.type"
    />

    <div class="add-product-form__submit-btn">
      <v-button :disabled="!isFormValid" type="submit">Добавить товар</v-button>
    </div>
  </form>
</template>

<script>
import { reactive, computed, watch } from 'vue';
import FormFieldTypes from './FormFieldTypes';

import VButton from '../ui/VButton.vue';
import AddProductFormField from './AddProductFormField.vue';

export default {
  name: 'AddProductForm',
  components: {
    VButton,
    AddProductFormField,
  },

  setup(props, ctx) {
    const form = reactive({
      title: {
        name: 'add-product-form-title',
        label: 'Наименование товара',
        value: null,
        isValid: null,
        error: '',
        required: true,
        type: FormFieldTypes.INPUT,
      },

      description: {
        name: 'add-product-form-description',
        label: 'Описание товара',
        value: null,
        isValid: null,
        error: '',
        required: false,
        type: FormFieldTypes.TEXTAREA,
      },

      image: {
        name: 'add-product-form-image',
        label: 'Ссылка на изображение товара',
        value: null,
        isValid: null,
        error: '',
        required: true,
        type: FormFieldTypes.INPUT,
      },

      price: {
        name: 'add-product-form-price',
        label: 'Цена товара',
        value: null,
        isValid: null,
        error: '',
        required: true,
        type: FormFieldTypes.PRICE,
      },
    });

    const getLabelClassname = (formName) => ({
      'add-product-form__label': true,
      'add-product-form__label_required': !!form[formName]?.required,
    });

    const checkFormFieldRequired = (formFieldName) => {
      const formField = form[formFieldName];
      if (!formField) return false;
      if (formField.value === null) return true;

      if (formField.required && !formField.value) {
        formField.error = 'Поле является обязательным';
        formField.isValid = false;
        return false;
      }
      formField.error = '';
      formField.isValid = true;
      return true;
    };

    const checkForm = () => {
      Object.keys(form).forEach((formFieldName) => {
        checkFormFieldRequired(formFieldName);
      });
    };

    watch(form, () => {
      checkForm();
    });

    const onSubmit = () => {
      ctx.emit('submit-form', {
        title: form.title.value,
        description: form.description.value,
        image: form.image.value,
        price: form.price.value,
      });
    };

    // eslint-disable-next-line max-len
    const isFormValid = computed(() => !Object.entries(form).some(([, field]) => !field.isValid && field.required));
    return {
      form,
      getLabelClassname,
      isFormValid,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

.add-product-form {
  &__submit-btn {
    margin-top: 8px;
  }
}
</style>
