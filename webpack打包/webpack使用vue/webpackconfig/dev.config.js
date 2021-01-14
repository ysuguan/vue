const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = webpackMerge(baseConfig, {
  plugins: [
    //使用webpack自带的bannerplugin
    new webpack.BannerPlugin("版权所有：@misaka"),
    //使用生成index.html的htmlwebpackplugin,不能安装最新版本，使用3.2.0
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: "./dist",
    inline: true
  }
})