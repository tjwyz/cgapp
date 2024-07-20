"use strict";

const path = require('path');


import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
async function createWindow() {
  // Create the browser window.
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
  console.log(process.env.WEBPACK_DEV_SERVER_URL);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  return win;
}

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  app.on('browser-window-created', (event, window) => {
    console.log('browser-window-created');
    // 确保事件只对新创建的窗口生效
    console.log('1Main BrowserWindow created:', window);

    // 修改窗口的样式
    window.setMenuBarVisibility(false); // 隐藏菜单栏
    window.setBackgroundColor('#000'); // 设置背景颜色
    window.setResizable(true); // 允许调整窗口大小
    window.webContents.openDevTools();
  });

  // 处理新窗口的打开
  app.on('web-contents-created', (event, webContents) => {
    console.log('web-contents-created');
    // webContents.openDevTools();
    webContents.setWindowOpenHandler(({ url }) => {
      const newWin = new BrowserWindow({
        width: 2800,
        height: 600,
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

      if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        newWin.loadURL(`http://localhost:8080/popPage.html?url=${url}`);
        // if (!process.env.IS_TEST) win.webContents.openDevTools();
      } else {
        createProtocol("app");
        // Load the index.html when not in development
        newWin.loadURL(`app://./popPage.html?url=${url}`);
      }

      return { action: 'deny' }; // 阻止默认行为，由我们手动处理
    });
  });

  ipcMain.handle('ping', () => {
    console.log('pong');
    return 'pong';
  });
  ipcMain.handle('ping1', () => {
    console.log('pong1');
    return 'pong1';
  });

  let mainWindow = await createWindow();
  ipcMain.on('window-minimize', () => {
    console.log(mainWindow);
    mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    mainWindow.close();
  });
  
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
