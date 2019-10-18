import axios from 'axios';

export default {
    namespaced:true,
  state: {
    products: [],
    categories: [],
  },
  // 操作行為
  actions: {
    getProducts(context) {
      const url =
        `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true,{root:true});
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        console.log('取得產品列表:', response);
        context.commit('CATEGORIES', response.data.products);
        context.commit('LOADING', false,{root:true});
      });
    },
  },
  // 實際操作狀態
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  // 類似 computed
  getters: {
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
  }
}
