<template>
  <webview id="example-webview" src="https://www.msn.com" nodeintegration allowpopups></webview>
</template>

<script>


export default {
  name: "Game",
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
  width: calc(100% - 80px);
  height: 100%;
}
</style>