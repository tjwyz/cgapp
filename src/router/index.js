import Vue from 'vue';
import Router from 'vue-router';

// 引入你的组件
import Game from '../page/Game.vue';
import Tool from '../page/Tool.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    },
    {
      path: '/tool',
      name: 'Tool',
      component: Tool
    }
  ]
});