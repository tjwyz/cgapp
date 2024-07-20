<template>
  <div class="nav-container">
    <div class="nav-item">Game</div>
    <div class="nav-item">Tool</div>
  </div>
</template>

<script>
export default {
  name: 'CgNav',
  mounted() {
  },
  methods: {
    minimizeWindow() {
      jsBridge.send('window-minimize');
    },
    maximizeWindow() {
      jsBridge.send('window-maximize');
    },
    closeWindow() {
      jsBridge.send('window-close');
    }
  }
}
</script>

<style scoped>
.nav-container {
  width: 80px;
  height: 100%;
  background: #333;
  color: #fff;
  -webkit-app-region: drag; /* 允许拖动 */
}
.nav-item {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>