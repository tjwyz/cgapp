<template>
  <div id="app">
    <CgHeader></CgHeader>
    <div class="page-container">
      <!-- <CgNav></CgNav> -->
      <div class="view-container">
        <CgWebView v-show="$route.path == '/'" url="https://www.msn.com/zh-cn/play"/>
        <CgWebView v-show="$route.path == '/msn'" url="https://www.msn.com"/>
        <CgToolPage v-show="$route.path == '/tool'"/>
      </div>
    </div>
  </div>
</template>

<script>
import CgHeader from './components/Header.vue';
import CgNav from './components/Nav.vue';
import CgWebView from './components/WebView.vue';
import CgToolPage from './components/ToolPage.vue'

export default {
  name: 'App',
  components: {
    CgHeader,
    CgNav,
    CgWebView,
    CgToolPage
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
  /*  width: calc(100% - 80px);*/
  width: 100%;
  height: 100%;
}
</style>