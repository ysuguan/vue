import {flag, name} from "./js/aaa"
import info from "./js/bbb"

require("./css/example.css");
require("./css/normal.less");

if(flag){
  console.log(name);
  console.log(info);
}

//为了让less文件修改的字体style显示，在页面中添加一些文字
document.writeln("<div>hello</div>");