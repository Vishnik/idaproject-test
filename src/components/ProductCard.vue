<template>
<article class="product-card">
  <div class="product-card__delete-btn">
    <v-badge @click="deleteProduct" style="cursor: pointer;" type="danger">
      <img src="../assets/images/trash-bin-icon.svg" alt="Delete product">
    </v-badge>
  </div>
  <div class="product-card__img-wrap">
    <img :src="image" @error="onImageLoadError" :alt="title" class="product-card__img">
  </div>
  <main class="product-card__content">
    <h3 class="product-card__title">{{ title }}</h3>
    <p class="product-card__description">{{ description }}</p>
    <div class="product-card__price">{{ formatPrice }}</div>
  </main>
</article>
</template>

<script>
import { computed } from 'vue';
import NumberFormatter from '../utils/NumberFormatter';

import VBadge from './ui/VBadge.vue';
import NoImage from '../assets/images/no-image.png';

export default {
  name: 'ProductCard',
  components: {
    VBadge,
  },
  props: {
    image: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup(props, ctx) {
    const formatPrice = computed(() => {
      const formatPriceNumber = NumberFormatter.formatNumber(props.price);
      return `${formatPriceNumber} руб.`;
    });
    const deleteProduct = () => {
      ctx.emit('delete');
    };

    const onImageLoadError = (e) => {
      e.target.src = NoImage;
    };

    return {
      formatPrice,
      deleteProduct,
      onImageLoadError,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/common";

.product-card {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background: #FFFEFB;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  font-family: 'Source Sans Pro', sans-serif;
  color: $main-text-color;
  transition: all 0.25s ease;
  &:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12), 0 6px 10px rgba(0, 0, 0, 0.06);
    .product-card__delete-btn {
      display: block;
    }
  }

  &__delete-btn {
    display: none;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    background: transparent;
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 999;
    cursor: pointer;
  }
  &__img-wrap {
    width: 100%;
    height: 0;
    padding-bottom: 60.240963855%;
    position: relative;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 16px;
  }

  &__title {
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
  }

  &__description {
    margin-top: 16px;
    margin-bottom: 32px;
    flex-grow: 1;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  &__price {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }
}
</style>
