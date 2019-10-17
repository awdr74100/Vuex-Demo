import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import router from './router';
// import Vuex from 'vuex';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// Vue.use(Vuex);
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
