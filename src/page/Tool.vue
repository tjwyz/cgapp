<template>
  <webview id="example-webview" src="https://www.msn.com" nodeintegration allowpopups></webview>
</template>

<script>


export default {
  name: "Tool",
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