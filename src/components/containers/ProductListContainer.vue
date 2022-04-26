<template>
  <div class="product-list-container">
    <header class="product-list-container__header">
      <div class="product-list-container__sort-select">
        <v-select :options="sortOptions" v-model="currentSortValue"></v-select>
      </div>
    </header>
    <product-list @delete-product="onDeleteProduct" :products="sortedProducts"></product-list>
  </div>
</template>

<script>
import { computed, ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import ProductSortOptions from '../../utils/ProductSortOptions';

import ProductList from '../ProductList.vue';
import VSelect from '../ui/VSelect.vue';

export default {
  name: 'ProductListContainer',
  components: {
    ProductList,
    VSelect,
  },

  setup() {
    const store = useStore();
    const products = computed(() => store.getters['ProductStore/products']);
    const sortOptions = [
      {
        label: 'По умолчанию',
        value: ProductSortOptions.NOT_SORTING,
      },
      {
        label: 'По цене min',
        value: ProductSortOptions.PRICE_ASC,
      },
      {
        label: 'По цене max',
        value: ProductSortOptions.PRICE_DEC,
      },
      {
        label: 'По названию',
        value: ProductSortOptions.TITLE,
      },
    ];

    const currentSortValue = ref(sortOptions[0].value);

    onBeforeMount(() => {
      if (!products.value.length) {
        store.dispatch('ProductStore/fetchProducts');
      }
    });

    const onDeleteProduct = (productId) => {
      store.dispatch('ProductStore/deleteProduct', productId);
    };

    const sortedProducts = computed(() => {
      switch (currentSortValue.value) {
        case ProductSortOptions.PRICE_DEC: return store.getters['ProductStore/sortedByDecPriceProducts'];
        case ProductSortOptions.PRICE_ASC: return store.getters['ProductStore/sortedByAscPriceProducts'];
        case ProductSortOptions.TITLE: return store.getters['ProductStore/sortedByTitleProducts'];
        case ProductSortOptions.NOT_SORTING: return products.value;
        default: return products.value;
      }
    });

    return {
      products: computed(() => store.getters['ProductStore/products']),
      onDeleteProduct,
      sortOptions,
      currentSortValue,
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
