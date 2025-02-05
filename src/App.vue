<template>
  <div id="app">
    <CgHeader></CgHeader>
    <div class="page-container">
      <div class="view-container">
        <CgWebView
          v-show="$route.path == '/'"
          url="https://www.msn.com/zh-cn/play?ocid=cgapp"
        />
        <div
          v-if="!privacyPopupHaveShown"
          class="popup-overlay"
          @click.stop="() => closePopup()"
        >
          <div class="popup-content" @click.stop="() => {}">
            <h3>同意个人数据跨境传输</h3>
            <p>
              当您在使用本产品以及列在“<a :href="moreLink" target="_blank"
                >了解更多</a
              >”页面中的产品和服务（统称“产品”）时，微软会将一些对于向您提供和运行产品所必须的个人数据传输至中国大陆之外。如果您选择传输，一些产品允许您发送额外的可选数据至中国大陆之外。传输的数据将被加密。除非您采取主动操作进行跨境传输。如主动将数据存储与境外云服务提供商，否则存储在您本地设备上的数据不会被传输出去。<br />如果您不同意传输对于提供本产品或者列在“<a
                :href="moreLink"
                target="_blank"
                >了解更多</a
              >”页面中的产品所必需的数据，
              您可以选择停止使用该产品。您可以在产品的使用条款中了解是否能获得退款。欲了解关于向微软商店退还产品的信息，请访问<a
                :href="returnLink"
                target="_blank"
                >退还从Microsoft 购买的物品以进行换货或退款</a
              >。<br />微软会根据<a :href="privacyLink" target="_blank"
                >Microsoft隐私声明</a
              >和<a :href="serviceLink" target="_blank">微软服务条款</a
              >处理以及传输数据。欲了解更多关于数据跨境传输的信息， 请访问“<a
                :href="moreLink"
                target="_blank"
                >了解更多</a
              >”页面。您可以通过<a :href="privacySupportLink" target="_blank"
                >隐私支持和请求</a
              >联系我们。<br />MSN游戏可能需要使用网络才能正常工作，继续使用您需支付由此产生的网络费用。
            </p>
            <button @click.stop="() => closePopup(true)">继续</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CgHeader from "./components/Header.vue";
import CgWebView from "./components/WebView.vue";

export default {
  name: "App",
  components: {
    CgHeader,
    CgWebView,
  },
  data() {
    return {
      moreLink:
        "https://support.microsoft.com/zh-cn/topic/%E4%BD%BF%E7%94%A8-microsoft-%E4%BA%A7%E5%93%81%E6%97%B6-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E4%B8%AA%E4%BA%BA%E6%95%B0%E6%8D%AE%E9%9C%80%E8%A6%81%E4%BB%8E%E4%B8%AD%E5%9B%BD%E4%BC%A0%E8%BE%93%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%9B%BD%E5%AE%B6%E6%88%96%E5%9C%B0%E5%8C%BA-b7b538b0-fd1c-4177-ba24-8b8c97defef6",
      returnLink:
        "https://support.microsoft.com/zh-cn/account-billing/%E9%80%80%E8%BF%98%E4%BB%8E-microsoft-%E8%B4%AD%E4%B9%B0%E7%9A%84%E7%89%A9%E5%93%81%E4%BB%A5%E8%BF%9B%E8%A1%8C%E6%8D%A2%E8%B4%A7%E6%88%96%E9%80%80%E6%AC%BE-81629012-aa4f-f48b-2394-8596f415072b",
      privacyLink: "https://www.microsoft.com/zh-cn/privacy/privacystatement",
      privacySupportLink:
        "https://www.microsoft.com/zh-cn/privacy/privacy-support-requests",
      serviceLink: "https://www.microsoft.com/zh-cn/servicesagreement/",
      privacyPopupHaveShown:
        localStorage.getItem("privacyPopupHaveShown") || false,
    };
  },
  methods: {
    closePopup(val) {
      this.privacyPopupHaveShown = true;
      if (val) {
        localStorage.setItem("privacyPopupHaveShown", true);
      }
    },
  },
};
</script>

<style>
/* 样式 */
body,
#app {
  margin: 0;
}
.page-container {
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.view-container {
  /*  width: calc(100% - 80px);*/
  width: 100%;
  height: 100%;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 600px;
  text-align: left;
}
.popup-content h3 {
  margin: 0;
}
.checkbox-group {
  margin: 20px 0;
}
.checkbox-item {
  margin-bottom: 10px;
  text-align: left;
}
button {
  background: rgb(33, 105, 235);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
