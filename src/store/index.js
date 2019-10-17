import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    categories: [],
  },
  // 操作行為
  actions: {
    // payload 載荷
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context) {
      const url =
        `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        console.log('取得產品列表:', response);
        context.commit('CATEGORIES', response.data.products);
        context.commit('LOADING', false);
      });
    },
  },
  // 實際操作狀態
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    }
  }
})
