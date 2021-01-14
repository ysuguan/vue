import {name, sum, flag} from "./aaa.js"
//引入匿名内容
import man from "./aaa.js"
//导入某个模块下的所有内容（必须设置别名)
import * as bbb from "./bbb.js"

//导入的多个模块中如果有重名的内容，浏览器会报错
//import {name, flag}  from "./bbb.js"


console.log(name);
if(flag)
{
  console.log(sum(50, 50));
}

const ming = new man();
const han = new bbb.girl();
ming.run();

if(!bbb.flag)
{
  console.log("just bbbbb  ");
  han.speak();
}