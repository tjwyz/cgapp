const { contextBridge, ipcRenderer, app } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  console.log("Preload script loaded!");

  contextBridge.exposeInMainWorld("jsBridge", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping"),
    getVersion: () => ipcRenderer.invoke("get-app-version"),
    invoke: ipcRenderer.invoke,
    send: ipcRenderer.send,
    // 除函数之外，我们也可以暴露变量
  });
});
