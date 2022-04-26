<template>
  <aside class="app-sidebar">
    <div class="app-sidebar__header">
      <h2 class="app-sidebar__title">Добавление товара</h2>
    </div>
    <div class="app-sidebar__add-product-form">
      <add-product-form-container></add-product-form-container>
    </div>
  </aside>
</template>

<script>
import AddProductFormContainer from '../containers/AddProductFormContainer.vue';

export default {
  name: 'VSidebar',
  components: {
    AddProductFormContainer,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/vars";
@import "../../assets/styles/mixins/breakpoints-mixin";

.app-sidebar {
  width: 100%;
  @include respond-to('lg') {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 83px;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;

    color: $main-text-color;
  }

  &__add-product-form {
    padding: 24px;
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
}
</style>
