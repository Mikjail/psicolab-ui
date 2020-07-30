import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import VerbalReasoning from '../views/VerbalReasoning/index.vue';
import VerbalReasoningIntro from '../views/VerbalReasoning/VerbalReasoningIntro.vue';
import VerbalReasoningTest from '../views/VerbalReasoning/VerbalReasoningTest.vue';
import TestFinished from '../views/TestFinished.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/verbal-reasoning/',
    component: VerbalReasoning,
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

export default router;
