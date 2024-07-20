<template>
  <div class="title-bar">
    <div class="title">My C1ustom Electron App</div>
    <div class="window-controls">
      <button @click="minimizeWindow">-</button>
      <button @click="maximizeWindow">[ ]</button>
      <button @click="closeWindow">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CgHeader',
  mounted() {
  },
  methods: {
    minimizeWindow() {
      console.log(jsBridge.invoke('ping1'));
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
.title-bar {
  -webkit-app-region: drag; /* 允许拖动 */

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #333;
  color: white;
}

.title-bar .title {
  padding-left: 10px;
}

.window-controls {
  display: flex;
  gap: 10px;
  padding-right: 10px;
}

.window-controls button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  -webkit-app-region: no-drag; /* 禁止按钮区域拖动 */
}

.window-controls button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>