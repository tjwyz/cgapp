<template>
  <webview id="example-webview" :src="url" nodeintegration allowpopups></webview>
</template>

<script>
export default {
  name: "CgWebView",
  props: {
    url: String
  },
  components: {
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style scoped>
#example-webview {
  width: 100%;
  height: 100%;
}
</style>