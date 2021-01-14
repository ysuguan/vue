//script标签中设置为module类型，必须先导入才能在其它模块中调用内容
let name = "韩梅梅",
  flag = false;

class girl {
  constructor(){
    this.name = name;
  }
  speak(){
    console.log('hello, I\'m ' + this.name);
  }
}

export {name, flag, girl};
