<template>
  <!-- <webview id="example-webview" :src="url" nodeintegration allowpopups></webview> -->
  <div id="example-webview">
    <button @click="gotoNetease">Netease cloud music</button>
    <button @click="shortCut">shortCut</button>
    {{version}}
  </div>
</template>

<script>
export default {
  name: "CgToolPage",
  props: {
    url: String
  },
  components: {
  },
  data() {
    return {
      version: '0.0.0'
    };
  },
  mounted() {
    setTimeout(() => {
      window?.jsBridge?.getVersion().then(val => {
        this.version = val;
      });
    }, 1000)
  },
  methods: {
    async gotoNetease() {
      const result = await jsBridge.invoke('open-thirdpart', 'orpheus://');
      console.log(result);
    },
    async shortCut() {
      const result = await jsBridge.invoke('short-cut');
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