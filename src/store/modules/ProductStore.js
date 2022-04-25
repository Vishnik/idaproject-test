import productsMock from '../../mocks/products';

const ProductStore = {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      const localStorageProducts = localStorage.getItem('products');
      if (localStorageProducts) {
        commit('SET_PRODUCTS', JSON.parse(localStorageProducts));
      } else {
        setTimeout(() => {
          commit('SET_PRODUCTS', productsMock);
        }, 2000);
      }
    },

    addProduct({ getters, commit }, product) {
      if (!product) return;
      const newProducts = [...getters.products, product];
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
