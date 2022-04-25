import { createStore } from 'vuex';
import ProductStore from './modules/ProductStore';

export default createStore({
  modules: {
    ProductStore,
  },
});
