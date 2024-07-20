<template>
  <div class="nav-container">
    <div class="nav-item" @click="gotoGame">Game</div>
    <div class="nav-item" @click="gotoTool">Tool</div>
  </div>
</template>

<script>
export default {
  name: 'CgNav',
  mounted() {
  },
  methods: {
    gotoGame() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    gotoTool() {
      if (this.$route.path !== '/tool') {
        this.$router.push('/tool');
      }
    },
  }
};
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
  -webkit-app-region: no-drag; /* 禁止按钮区域拖动 */
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>