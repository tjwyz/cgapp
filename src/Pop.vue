<template>
  <div id="app">
    <CgHeader></CgHeader>
    <div class="page-container">
      <webview id="example-webview" :src="url" nodeintegration allowpopups></webview>
    </div>
  </div>
</template>

<script>
import CgHeader from './components/Header.vue';
export default {
  name: 'Pop',
  components: {
    CgHeader,
  },
  data() {
    return {
      url: '' // 初始化 url 属性为空字符串
    };
  },
  mounted() {
    this.url = this.getUrlParam(location.href, 'url');
  },
  methods: {
    getUrlParam(url, paramName) {
      const regex = new RegExp('[?&]' + paramName + '=([^&#]*)', 'i');
      const match = url.match(regex);
      return match ? decodeURIComponent(match[1]) : null;
    }
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
#example-webview {
  width: 100%;
  height: 100%;
}
</style>