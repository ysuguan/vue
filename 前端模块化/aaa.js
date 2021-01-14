const name = '李雷',
  flag = true;

function sum(num1, num2){
  const result = num1 + num2;
  console.log(result);
}

export {name, flag, sum};
//导出匿名内容,每个模块内只允许导出一个匿名内容
export default class person{
  run (){
    console.log("那天夕阳下的奔跑，是我逝去的青春");
  }
};