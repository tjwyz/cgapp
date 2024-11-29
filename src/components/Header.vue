<template>
  <div class="title-bar">
    <div class="title">
      <LogoSvg :style="{ marginRight: '6px' }"/>
      Windows Gaming App
    </div>
    <div class="window-controls">
      <button @click="minimizeWindow"><MinSvg/></button>
      <button @click="maximizeWindow"><MaxSvg/></button>
      <button @click="closeWindow"><CloseSvg/></button>
    </div>
  </div>
</template>

<script>
import LogoSvg from '../assets/logo.svg';
import MinSvg from '../assets/min.svg';
import MaxSvg from '../assets/max.svg';
import CloseSvg from '../assets/close.svg';
export default {
  name: 'CgHeader',
  components: {
    LogoSvg,
    MinSvg,
    MaxSvg,
    CloseSvg
  },
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
  background: #fff;
  color: #333;
}

.title-bar .title {
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 16px;
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