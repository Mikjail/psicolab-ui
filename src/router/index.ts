import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import VerbalReasoning from '../views/VerbalReasoning.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Verbal Reasoning',
    component: VerbalReasoning,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
