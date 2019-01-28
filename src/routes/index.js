import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const appRouter = new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/Layout'),
      children: [
        {
          path: '/',
          component: () => import('../components/Welcome'),
          name: 'home',
        },
        {
          name: 'stores',
          path: '/stores',
          component: () => import('../views/Stores.vue')
        },
        {
          name: 'articles',
          path: '/articles',
          component: () => import('../views/Articles.vue')
        },
      ]
    },
  ]
});

export default appRouter;
