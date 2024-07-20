const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    devtool: 'source-map',
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    another: {
      entry: 'src/popPage.js',
      template: 'public/popPage.html',
      filename: 'popPage.html',
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      electronVersion: '31',
      preload: 'src/preload.js',
      builderOptions: {
        // 在这里添加更多 electron-builder 配置选项，例如打包配置等
        appId: 'com.microsoft.cgapp',
        productName: 'MyApp',
        directories: {
          output: 'dist_electron'
        },
        files: [
          '**/*'
        ],
        extraResources: [
          {
            from: 'src/preload.js',
            to: 'preload.js'
          },
          {
            from: 'public/assets/',
            to: 'assets/',
            filter: ['**/*']
          }
        ],
        win: {
          target: 'nsis',
          icon: 'build/icon.ico'
        },
        mac: {
          target: 'dmg',
          icon: 'build/icon.icns'
        },
        linux: {
          target: 'AppImage',
          icon: 'build/icon.png'
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
});
