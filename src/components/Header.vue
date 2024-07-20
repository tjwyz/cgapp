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
    this.id = this.getUrlParam(location.href, 'id');
  },
  methods: {
    minimizeWindow() {
      jsBridge.send('window-minimize', this.id);
    },
    maximizeWindow() {
      jsBridge.send('window-maximize', this.id);
    },
    closeWindow() {
      jsBridge.send('window-close', this.id);
    },
    getUrlParam(url, paramName) {
      const regex = new RegExp('[?&]' + paramName + '=([^&#]*)', 'i');
      const match = url.match(regex);
      return match ? decodeURIComponent(match[1]) : null;
    }
  }
};
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