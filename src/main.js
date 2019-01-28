import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import router from './routes';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app');
