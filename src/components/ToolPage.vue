<template>
  <!-- <webview id="example-webview" :src="url" nodeintegration allowpopups></webview> -->
  <div id="example-webview"><button @click="gotoNetease">Netease cloud music</button></div>
</template>

<script>
export default {
  name: "CgToolPage",
  props: {
    url: String
  },
  components: {
  },
  mounted() {
  },
  methods: {
    async gotoNetease() {
      const result = await jsBridge.invoke('open-thirdpart', 'orpheus://');
      console.log(result);
    }
  }
};
</script>

<style scoped>
#example-webview {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>