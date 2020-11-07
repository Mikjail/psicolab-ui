import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth.module';

Vue.use(Vuex);

export default new Vuex.Store({ // eslint-disable-line no-new
  modules: {
    auth,
  },
});
