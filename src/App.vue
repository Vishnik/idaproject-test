<template>
  <div class="app">
    <div class="app__sidebar" :class="{'app__sidebar_open': isSidebarOpen}">
      <v-sidebar></v-sidebar>
    </div>
    <main class="app__main">
      <header class="app__header">
        <div class="app__toggle-sidebar-btn">
          <v-button
            v-if="!isSidebarOpen"
            @click.self="isSidebarOpen = true"
          >
            Добавить товар
          </v-button>
          <v-button
            v-else
            @click.self="isSidebarOpen = false"
          >
            Закрыть форму
          </v-button>
        </div>
        <div class="app__product-sort-select">
          <v-select
            :options="sortOptions"
            v-model="currentSortValue"
          ></v-select>
        </div>
      </header>
      <product-list-container :sort-by="currentSortValue"></product-list-container>
    </main>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import ProductSortOptions from './utils/ProductSortOptions';
import scrollToTop from './utils/scrollToTop';

import VSidebar from './components/layout/VSidebar.vue';
import ProductListContainer from './components/containers/ProductListContainer.vue';
import VSelect from './components/ui/VSelect.vue';
import VButton from './components/ui/VButton.vue';

export default {
  name: 'App',
  components: {
    ProductListContainer,
    VSelect,
    VSidebar,
    VButton,
  },
  setup() {
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
    const isSidebarOpen = ref(false);

    watch(currentSortValue, () => {
      scrollToTop();
    });

    return {
      sortOptions,
      currentSortValue,
      isSidebarOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/mixins/breakpoints-mixin";
@import "./assets/styles/vars";

.app {
  height: 100%;
  min-height: 100vh;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  @include respond-to('md') {
    margin-left: 20px;
    margin-right: 20px;
  }
  @include respond-to('xl') {
    margin-left: 32px;
    margin-right: 32px;
  }

  &__sidebar {
    position: fixed;
    min-width: 332px;
    height: 100vh;
    top: 83px;
    left: 0;
    transform: translateX(-350px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    z-index: 3;
    background: #e5e5e5;
    padding-left: 10px;
    padding-right: 10px;
    transition: transform 0.25s ease;
    &_open {
      transform: translateX(0);
    }

    @include respond-to('lg') {
      top: 0;
      padding-left: 0;
      padding-right: 0;
      margin-right: 16px;
      position: sticky;
      transform: none;
    }

  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    flex-grow: 1;
    position: relative;
    min-height: 100vh;
  }

  &__header {
    width: 100%;
    height: 83px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    background: #e5e5e5;
    @include respond-to('lg') {
      justify-content: flex-end;
    }
  }

  &__product-sort-select {
    width: 121.48px;
  }

  &__toggle-sidebar-btn {
    display: block;
    width: 140px;
    @include respond-to('lg') {
      display: none;
    }
  }
}

</style>
