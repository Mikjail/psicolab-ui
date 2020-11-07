import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import TokenService from '@/services/storage.service';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import VerbalReasoning from '../views/VerbalReasoning/index.vue';
import VerbalReasoningIntro from '../views/VerbalReasoning/VerbalReasoningIntro.vue';
import VerbalReasoningTest from '../views/VerbalReasoning/VerbalReasoningTest.vue';
import TestFinished from '../views/TestFinished.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/verbal-reasoning/',
    component: VerbalReasoning,
    meta: {
      public: true,
    },
    children: [
      { path: '', component: VerbalReasoningIntro, name: 'Verbal Reasoning' },
      { path: 'example-test', component: VerbalReasoningTest },
      { path: 'test', component: VerbalReasoningTest },
      { path: 'finished', component: TestFinished },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  return next();
});

export default router;
