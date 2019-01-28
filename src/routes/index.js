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
          component: () => import('../views/Stores')
        },
        {
          name: 'articlesByStore',
          path: '/stores/:store/articles',
          component: () => import('../views/ArticlesByStore'),
          props: (route) => ({
            store: Number(route.params.store),
          })
        },
        {
          name: 'articles',
          path: '/articles',
          component: () => import('../views/Articles')
        },
      ]
    },
  ]
});

export default appRouter;
