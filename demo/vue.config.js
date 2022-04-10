/*
 * File: vue.config.js                                                         *
 * Project: demo                                                               *
 * Created Date: 2022-04-10 19:10:40                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-10 19:10:43                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------    *
 */

"use strict";

// NOTE: 端口号
const port = 8082

module.exports = {
  publicPath: "/",
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
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://www.xxx.com/`,
        changeOrigin: true,
        pathRewrite: {
          // ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
  chainWebpack(config) {
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) =>
        config.devtool('cheap-source-map')
      );

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
}
