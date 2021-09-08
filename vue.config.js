"use strict";

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

let name = require("./package.json").name;
name = "test";

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // 第三方插件配置
  pluginOptions: {},
  configureWebpack: {
    name: name,
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      library: name,
      libraryTarget: "umd2",
      filename: name + ".js",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  chainWebpack(config) {
    config.set("externals", {
      vue: "Vue",
      // axios: 'axios',
      // echarts: 'echarts'
    });
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    // requireModuleExtension: true,
    loaderOptions: {
      scss: {
        // 这里的选项会传递给 scss-loader
      }
    }
  }
};
