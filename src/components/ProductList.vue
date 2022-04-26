<template>
  <TransitionGroup name="list" class="product-list" tag="div">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-list__item"
    >
      <ProductCard
        :title="product.title"
        :description="product.description"
        :image="product.image"
        :price="product.price"
        @delete="onDelete(product.id)"
      />
    </div>
  </TransitionGroup>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  setup(props, ctx) {
    const onDelete = (productId) => {
      ctx.emit('delete-product', productId);
    };

    return {
      onDelete,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/mixins/breakpoints-mixin";

.product-list {
  --min-product-card-width: 280px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-product-card-width), 1fr));
  grid-column-gap: 1.556420233%;
  grid-row-gap: 10px;
  @include respond-to('lg') {
    --min-product-card-width: 300px;
  }
  @include respond-to('xl') {
    grid-row-gap: 16px;
    --min-product-card-width: 332px;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.product-list__item {
  transition: all ease 0.5s;
}

</style>
