//项目中npm初始化之后，会生成一些环境变量，这种语法可以调用
const path = require('path');

//未配置npm脚本命令时，在当前项目根目录下只用webpack命令（无需路径参数）就可以实现入口文件打包
module.exports = {
  entry: "./src/main.js",
  output: {
    //path要求绝对路径，此处用npm来生成
    path: path.resolve(__dirname, 'dist'),
    filename: "run.js"
  }
}