import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Game',
    },
    {
      path: '/msn',
      name: 'Msn',
    },
    {
      path: '/tool',
      name: 'Tool',
    }
  ]
});