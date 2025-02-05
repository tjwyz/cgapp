import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 引入 router

Vue.config.productionTip = false;

new Vue({
  router, // 使用 router
  render: (h) => h(App),
}).$mount("#app");
