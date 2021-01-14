import {flag, name} from "./js/aaa"
import info from "./js/bbb"

require("./css/example.css");
require("./css/normal.less");

//通过npm加载vue
import Vue from "vue";
//导入主组件
import App from "./vue/App.vue";

new Vue({
  el: "#app",
  //用注册的主组件作为模板，替换index.html中的div
  template: "<App/>",
  components: {
    App
  }
});

//为了让less文件修改的字体style显示，在页面中添加一些文字
document.writeln("<div>hello</div>");