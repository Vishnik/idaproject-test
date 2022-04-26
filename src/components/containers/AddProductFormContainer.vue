<template>
<add-product-form @submit-form="onFormSubmit"></add-product-form>
</template>

<script>
import { useStore } from 'vuex';

import AddProductForm from '../AddProductForm/AddProductForm.vue';

export default {
  name: 'AddProductFormContainer',
  components: {
    AddProductForm,
  },

  setup() {
    const store = useStore();
    const onFormSubmit = (product) => {
      const productWithId = {
        id: String(Math.random()),
        ...product,
      };
      store.dispatch('ProductStore/addProduct', productWithId);
    };
    return {
      onFormSubmit,
    };
  },
};
</script>

<style scoped>

</style>
