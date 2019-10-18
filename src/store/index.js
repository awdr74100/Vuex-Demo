import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import productsModules from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    // products: [],
    // categories: [],
    cart: {
      carts: [],
    },
  },
  // 操作行為
  actions: {
    // payload 載荷
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    // getProducts(context) {
    //   const url =
    //     `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
    //   context.commit('LOADING', true);
    //   axios.get(url).then((response) => {
    //     context.commit('PRODUCTS', response.data.products);
    //     console.log('取得產品列表:', response);
    //     context.commit('CATEGORIES', response.data.products);
    //     context.commit('LOADING',false);
    //   });
    // },
    getCart(context) {
      const vm = this;
      context.commit('LOADING',false);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART',response.data.data);
        }
        context.commit('LOADING',false);
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context,id) {
      const vm = this;
      const url =
        `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(url).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
    addtoCart(context,{id, qty}) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const item = {
        product_id: id,
        qty,
      };
      context.commit('LOADING', true);
      axios.post(url, {
        data: item
      }).then((response) => {
        context.dispatch('getCart');
        context.commit('LOADING', false);
        console.log('加入購物車:', response);
      });
    },
  },
  // 實際操作狀態
  mutations: {
    LOADING(state,status) {
      state.isLoading = status;
    },
    // PRODUCTS(state, payload) {
    //   state.products = payload;
    // },
    // CATEGORIES(state, payload) {
    //   const categories = new Set();
    //   payload.forEach((item) => {
    //     categories.add(item.category);
    //   });
    //   state.categories = Array.from(categories);
    // },
    CART(state,payload){
      state.cart = payload;
    }
  },
  // 類似 computed
  getters:{
    // categories(state){
    //   return state.categories;
    // },
    // products(state){
    //   return state.products;
    // },
    isLoading(state){
      return state.isLoading;
    },
    cart(state){
      return state.cart;
    },
  },
  modules:{
    productsModules,
  }
})
