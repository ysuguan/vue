//项目中npm初始化之后，会生成一些环境变量，这种语法可以调用
const path = require('path');
//非webpack自带的插件需要在此处引入
const uglifyjswebpackplugin = require("uglifyjs-webpack-plugin");

//未配置npm脚本命令时，在当前项目根目录下只用webpack命令（无需路径参数）就可以实现入口文件打包
module.exports = {
  entry: "./src/main.js",
  output: {
    //path要求绝对路径，此处用npm来生成
    path: path.resolve(__dirname, '../dist'),
    filename: "run.js",
    //publicPath: "dist/"
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        //css的加载和使用
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.less$/,
        //less-loader的加载使用，less-loader版本过高会导致打包失败，指定安装5.0.0版本即可
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            //图片URL被加载成([object, object])是因为url-loader版本过高，降级0.6.2即可
            loader: 'url-loader',
            options: {
              //超过limit限制大小的图片会自动调用file-loader，按照下方name指定的路径+名字打包成发行文件
              limit: 8192,
              //webpack会将打包的图片name直接返回给调用者（替换引入文件中的url内容），但实际会因为上方的path指定
              //被打包到dist目录下，所以应当在output中指定publicPath路径
              name: 'img/[name].[hash:8].[ext]'
            }
          },
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use:{
          //bable的一套版本很操蛋，注意安装只能选择以下版本：
          // "babel-core": "^6.26.3",
          // "babel-loader": "^7.1.5",
          // "babel-preset-es2015": "^6.24.1",
          loader: "babel-loader",
          options:{
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  }
}