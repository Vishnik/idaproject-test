<template>
  <product-list @delete-product="onDeleteProduct" :products="products"></product-list>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import ProductList from '../ProductList.vue';

export default {
  name: 'ProductListContainer',
  components: {
    ProductList,
  },

  setup() {
    const store = useStore();
    const products = computed(() => store.getters['ProductStore/products']);

    onBeforeMount(() => {
      if (!products.value.length) {
        store.dispatch('ProductStore/fetchProducts');
      }
    });

    const onDeleteProduct = (productId) => {
      store.dispatch('ProductStore/deleteProduct', productId);
    };

    return {
      products: computed(() => store.getters['ProductStore/products']),
      onDeleteProduct,
    };
  },
};
</script>

<style scoped>

</style>
