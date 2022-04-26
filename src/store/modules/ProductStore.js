import productsMock from '../../mocks/products';
import sleep from '../../utils/sleep';

const ProductStore = {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products(state) {
      return state.products;
    },
    sortedByAscPriceProducts(state) {
      const productsCopy = [...state.products];
      return productsCopy.sort((productOne, productTwo) => productOne.price - productTwo.price);
    },
    sortedByDecPriceProducts(state) {
      const productsCopy = [...state.products];
      return productsCopy.sort((productOne, productTwo) => productTwo.price - productOne.price);
    },

    sortedByTitleProducts(state) {
      const productsCopy = [...state.products];
      return productsCopy.sort((productOne, productTwo) => {
        const productOneLowerTitle = productOne.title.toLowerCase();
        const productTwoLowerTitle = productTwo.title.toLowerCase();
        return productOneLowerTitle.localeCompare(productTwoLowerTitle);
      });
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const localStorageProducts = localStorage.getItem('products');
      if (localStorageProducts) {
        commit('SET_PRODUCTS', JSON.parse(localStorageProducts));
        return JSON.parse(localStorageProducts);
      }

      await sleep(2000);
      commit('SET_PRODUCTS', productsMock);
      return productsMock;
    },

    addProduct({ getters, commit }, product) {
      if (!product) return;
      const newProducts = [product, ...getters.products];
      commit('SET_PRODUCTS', newProducts);
    },

    deleteProduct({ getters, commit }, productId) {
      const newProducts = getters.products.filter((p) => p.id !== productId);
      commit('SET_PRODUCTS', newProducts);
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      localStorage.setItem('products', JSON.stringify([...products]));
    },
  },
};

export default ProductStore;
