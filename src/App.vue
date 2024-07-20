<template>
  <div id="app">
    <CgHeader></CgHeader>
    <div class="page-container">
      <CgNav></CgNav>
      <router-view></router-view> <!-- 显示匹配的组件 -->
    </div>
  </div>
</template>

<script>
import CgHeader from './components/Header.vue';
import CgNav from './components/Nav.vue';
export default {
  name: 'App',
  components: {
    CgHeader,
    CgNav
  }
};
</script>

<style>
/* 样式 */
body, #app {
  margin: 0;
}

.page-container {
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>