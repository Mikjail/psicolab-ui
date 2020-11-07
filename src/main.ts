import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import ApiService from './services/api.service';
import TokenService from './services/storage.service';
import store from './store';

Vue.config.productionTip = false;

Vue.use(require('vue-moment'));

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API);

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
