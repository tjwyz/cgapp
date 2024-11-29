const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: './',
  outputDir: 'dist',
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
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
        publish: [
          {
            provider: 'github',
            owner: 'tjwyz',
            repo: 'cgapp',
            token: ''
          }
        ],
        directories: {
          output: 'dist_electron'
        },
        files: [
          '**/*',
          "icon.ico"
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
        protocols: [
          {
            name: "MyApp Protocol",
            schemes: ["cgapp"]
          }
        ],
        nsis: {
          oneClick: true,
          allowToChangeInstallationDirectory: false,
          differentialPackage: true,
          perMachine: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "CGApp",
          // include: "build/installer.nsh"
        },
        win: {
          target: 'nsis',
          icon: 'build/favicon.ico'
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
});
