<template>
    <product-list @delete-product="onDeleteProduct" :products="sortedProducts"></product-list>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import ProductSortOptions from '../../utils/ProductSortOptions';

import ProductList from '../ProductList.vue';

export default {
  name: 'ProductListContainer',
  components: {
    ProductList,
  },

  props: {
    sortBy: {
      type: String,
      required: false,
      default: ProductSortOptions.NOT_SORTING,
    },
  },

  setup(props) {
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

    const sortedProducts = computed(() => {
      switch (props.sortBy) {
        case ProductSortOptions.PRICE_DEC: return store.getters['ProductStore/sortedByDecPriceProducts'];
        case ProductSortOptions.PRICE_ASC: return store.getters['ProductStore/sortedByAscPriceProducts'];
        case ProductSortOptions.TITLE: return store.getters['ProductStore/sortedByTitleProducts'];
        case ProductSortOptions.NOT_SORTING: return store.getters['ProductStore/products'];
        default: return store.getters['ProductStore/products'];
      }
    });

    return {
      onDeleteProduct,
      sortedProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  &__sort-select {
    width: 121.48px;
    margin-bottom: 16px;
  }
}
</style>
