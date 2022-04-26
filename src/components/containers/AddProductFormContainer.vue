<template>
  <add-product-form @submit-form="onFormSubmit"></add-product-form>
  <v-notification :is-show="isShowNotification">Товар успешно добавлен</v-notification>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import AddProductForm from '../AddProductForm/AddProductForm.vue';
import VNotification from '../VNotification.vue';

export default {
  name: 'AddProductFormContainer',
  components: {
    AddProductForm,
    VNotification,
  },

  setup() {
    const store = useStore();
    const isShowNotification = ref(false);

    const showNotification = () => {
      isShowNotification.value = true;
      const timer = setTimeout(() => {
        isShowNotification.value = false;
        clearTimeout(timer);
      }, 2000);
    };
    const onFormSubmit = async (product) => {
      const productWithId = {
        id: String(Math.random()),
        ...product,
      };
      await store.dispatch('ProductStore/addProduct', productWithId);
      showNotification();
    };
    return {
      onFormSubmit,
      isShowNotification,
    };
  },
};
</script>

<style scoped>

</style>
