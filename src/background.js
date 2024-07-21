"use strict";
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

class WindowManager {
  constructor() {
    this.windows = {};
  }

  // 创建一个新窗口并返回
  createWindow(options) {
    const id = uuidv4();
    const win = new BrowserWindow({
      width: 1800,
      height: 1600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // 设置预加载脚本路径
        webSecurity: false,
        nodeIntegration: false,
        contextIsolation: true,  // 关闭上下文隔离，允许 <webview> 中的网页访问 Node.js API
        webviewTag: true,  // 允许使用 <webview> 标签
        nativeWindowOpen: true // 启用 nativeWindowOpen
      },
      frame: false,
    });
    this.windows[id] = win;
    win.on('closed', () => {
      // 清理已关闭的窗口
      delete this.windows[id];
    });
    return { id, win };
  }

  createMainWindow() {
    const { id, win } = this.createWindow();
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(`http://localhost:8080/index.html?id=${id}`);
      // if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      win.loadURL(`app://./index.html?id=${id}`);
    }
    return win;
  }

  createPopWindow(url) {
    const { id, win } = this.createWindow();
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(`http://localhost:8080/popPage.html?url=${url}&id=${id}`);
      // if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      win.loadURL(`app://./popPage.html?url=${url}&id=${id}`);
    }

    return win;
  }

  // 获取所有窗口
  getAllWindows() {
    return this.windows;
  }

  // 关闭特定窗口
  closeWindow(id) {
    const win = this.windows[id];
    if (win) {
      win.close();
    } else {
      console.error(`Window with ID ${id} does not exist.`);
    }
  }
  // 关闭所有窗口
  closeAllWindows() {
    Object.keys(this.windows).forEach(id => this.closeWindow(id));
  }

  // 最小化特定窗口
  minimizeWindow(id) {
    const win = this.windows[id];
    if (win) {
      win.minimize();
    } else {
      console.error(`Window with ID ${id} does not exist.`);
    }
  }
  // 最小化所有窗口
  minimizeAllWindows() {
    Object.keys(this.windows).forEach(id => this.minimizeWindow(id));
  }


  // 最大化特定窗口
  maximizeWindow(id) {
    const win = this.windows[id];
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    } else {
      console.error(`Window with ID ${id} does not exist.`);
    }
  }
  // 最大化所有窗口
  maximizeAllWindows() {
    Object.keys(this.windows).forEach(id => this.maximizeWindow(id));
  }

  // // 恢复所有窗口（从最大化状态）
  // restoreAllWindows() {
  //   this.windows.forEach(win => win.restore());
  // }
}
const windowManager = new WindowManager();

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) windowManager.createMainWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {

  app.commandLine.appendSwitch('remote-debugging-port', '9222');

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  app.on('browser-window-created', (event, window) => {
    // 修改窗口的样式
    window.setMenuBarVisibility(false); // 隐藏菜单栏
    window.setBackgroundColor('#000'); // 设置背景颜色
    window.setResizable(true); // 允许调整窗口大小
    window.webContents.openDevTools();
  });

  // 处理新窗口的打开
  app.on('web-contents-created', (event, webContents) => {
    // webContents.openDevTools();
    webContents.setWindowOpenHandler(({ url }) => {
      windowManager.createPopWindow(url);
      return { action: 'deny' }; // 阻止默认行为，由我们手动处理
    });
  });

  ipcMain.handle('open-thirdpart', (event, link) => {
    return new Promise((resolve, reject) => {
      exec(`start ${link}`, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr });
      });
    });
  });

  ipcMain.on('window-minimize', (event, windowId) => {
    windowManager.minimizeWindow(windowId);
  });

  ipcMain.on('window-maximize', (event, windowId) => {
    windowManager.maximizeWindow(windowId);
  });

  ipcMain.on('window-close', (event, windowId) => {
    windowManager.closeWindow(windowId);
  });


  // 如果是 Windows 平台，注册应用为处理 'cgapp' 协议的默认客户端
  app.setAsDefaultProtocolClient('cgapp');

  // 处理启动参数
  const args = process.argv.slice(1); // 获取启动参数
  let invokedBySuperLink = 'cgapp://pop?url=baidu';
  args.forEach((arg) => {
    if (arg.startsWith('cgapp://')) {
      invokedBySuperLink = arg;
    }
  });
  if (invokedBySuperLink) {
    const regex = /^cgapp:\/\/pop\/\?url=([^&]*)/;
    const match = invokedBySuperLink.match(regex);
    if (match && match[1]) {
      windowManager.createPopWindow(decodeURIComponent(match[1]));
    } else {
      windowManager.createMainWindow();
    }
  } else {
    windowManager.createMainWindow();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
