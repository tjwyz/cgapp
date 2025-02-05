<template>
  <div class="title-bar">
    <div class="title">
      <LogoSvg :style="{ marginRight: '6px' }" />
      MSN游戏
    </div>
    <div class="window-controls">
      <button @click="minimizeWindow"><MinSvg /></button>
      <button @click="maximizeWindow">
        <component :is="currentIcon" />
      </button>
      <button @click="closeWindow"><CloseSvg /></button>
    </div>
  </div>
</template>

<script>
import LogoSvg from "../assets/logo.svg";
import MinSvg from "../assets/min.svg";
import MaxSvg from "../assets/max.svg";
import RestoreSvg from "../assets/restore.svg";
import CloseSvg from "../assets/close.svg";

export default {
  name: "CgHeader",
  components: {
    LogoSvg,
    MinSvg,
    MaxSvg,
    RestoreSvg,
    CloseSvg,
  },
  data() {
    return {
      maximize: true
    }
  },
  computed: {
    currentIcon() {
      return !this.maximize ? 'RestoreSvg' : 'MaxSvg';
    },
  },
  mounted() {
    this.id = this.getUrlParam(location.href, "id");
  },
  methods: {
    minimizeWindow() {
      window?.jsBridge?.send("window-minimize", this.id);
    },
    maximizeWindow() {
      window?.jsBridge?.send("window-maximize", this.id);
      this.maximize = !this.maximize;
    },
    closeWindow() {
      window?.jsBridge?.send("window-close", this.id);
    },
    getUrlParam(url, paramName) {
      const regex = new RegExp("[?&]" + paramName + "=([^&#]*)", "i");
      const match = url.match(regex);
      return match ? decodeURIComponent(match[1]) : null;
    },
  },
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
  font-family: system-ui;
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
  gap: 16px;
  padding-right: 10px;
}

.window-controls button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  -webkit-app-region: no-drag; /* 禁止按钮区域拖动 */
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  padding: 0;
}

.window-controls button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
