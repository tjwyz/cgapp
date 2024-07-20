<template>
  <div id="app">
    <CgHeader></CgHeader>
    <div class="page-container">
      <CgNav></CgNav>
      <div class="view-container">
        <CgWebView v-show="$route.path == '/'" url="https://www.msn.com/zh-cn/play"/>
        <CgWebView v-show="$route.path == '/tool'" url="https://www.msn.com"/>
      </div>
    </div>
  </div>
</template>

<script>
import CgHeader from './components/Header.vue';
import CgNav from './components/Nav.vue';
import CgWebView from './components/WebView.vue';
export default {
  name: 'App',
  components: {
    CgHeader,
    CgNav,
    CgWebView
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
.view-container {
  width: calc(100% - 80px);
  height: 100%;
}
</style>