const { contextBridge, ipcRenderer } = require('electron')
// const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
  console.log('sadasd');
  console.log('Preload script loaded!');

  // ipcRenderer.invoke('ping1', 'data1');

  contextBridge.exposeInMainWorld('jsBridge', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // webviewSrc: () => path.join(__dirname, 'webviewPreload.js'),
    invoke: ipcRenderer.invoke,
    send: ipcRenderer.send,
    // 除函数之外，我们也可以暴露变量
  })
});


