## 笔记
### promise
1. #### promise是什么，回调函数的含义
   + promise是异步编程的一种解决方案，其优势在于避免陷入嵌套异步操作的回调地狱，更直观优雅地组织代码
2. #### 基本语法（两种写法），链式编程，构造方法参数的含义
   + 构造方法接受的函数有两个参数`resolve\reject`,都是函数，实际就是用resolve(参数)来替代异步操作成功的回调函数，函数体定义在`Promise.then(参数=>{})`中用reject(参数)来替代异步操作失败的回调函数，函数体定义在`Promise.catch(参数=>{})`中
   + 第一种写法：
        ```
        new Promise((resolve, reject) => {
            setTimeOut(()=>{
                //resolve(异步成功数据);
                reject(异步失败数据);
            }, 1000);
        }).then(异步成功数据 => {
            //数据处理代码
        })catch(异步失败数据 => {
            //数据处理代码
        });
        ```
    + 第二种写法：
       ```
        new Promise((resolve, reject) => {
            setTimeOut(()=>{
                //resolve(异步成功数据);
                reject(异步失败数据);
            }, 1000);
        }).then(异步成功数据 => {
            //数据处理代码
        }, 异步失败数据 => {
            //数据处理代码
        });
       ``` 
    + promise通过链式编程拆分了异步操作和回调函数，链式代码示例：
      ```
        new Promise((resolve, reject) => {
            setTimeOut(()=>{
                resolve(一次异步成功数据);
            }, 1000);
        }).then(异步成功数据 => {
            //数据处理代码

            return new Promise((resolve, reject) => {
                setTimeOut(()=>{
                    resolve(二次异步成功数据);
                }, 1000);
            })
        }).then(二次异步成功数据 => {
            //数据处理代码
        });
      ```
    + **多步都有不同的resolve和reject时，then和catch应该交替写，或者使用`then(res=>{}, err => {})`写法，这样避免后续处理步骤错乱**;多步处理共用同一reject时，reject放到最后即可

3. #### 非异步链式调用与三种写法
<details>
    + 当我们需要对异步操作获取的数据进行多次不同的处理操作时，同样可以通过promise链式编程来封装代码
    + 第一种写法：
      + 注：reject参数如果用不上可以不传入
      ```
        new Promise((resolve, reject) => {
            setTimeOut(()=> {
                resolve(异步数据);
            }, 1000);
        }).then(异步数据 => {
            //一次处理
            //一次处理
            //一次处理
            //一次处理

            return new Promise(resolve => {
                resolve(二手数据)
            });
        }).then(二手数据 => {
            //二次处理
            //二次处理
            //二次处理
            //二次处理

            return new Promise(resolve => {
                resolve(三手数据)
            });
        }).then(三手数据 => {
            //三次处理。。。
        });
      ```
    + 第二种写法:省略创建对象操作
      + 注：此处添加了对reject的调用
      ```
        new Promise((resolve, reject) => {
            setTimeOut(()=> {
                resolve(异步数据);
            }, 1000);
        }).then(异步数据 => {
            //一次处理
            //一次处理
            //一次处理
            //一次处理

            //return Promise.resolve(二手数据);
            return Promise.reject(二手异常);
        }).then(二手数据 => {
            //二次处理
            //二次处理
            //二次处理
            //二次处理

            return Promise.resolve(三手数据);
        }).then(三手数据 => {
            //三次处理。。。
        }).catch(二手异常 => {
            //二手异常处理
        });
      ```
    + 第三种写法：省略对类方法的调用,对reject进行简写
      ```
        new Promise((resolve, reject) => {
            setTimeOut(()=> {
                resolve(异步数据);
            }, 1000);
        }).then(异步数据 => {
            //一次处理
            //一次处理
            //一次处理
            //一次处理

            //return 二手数据;
            throw 二手异常
        }).then(二手数据 => {
            //二次处理
            //二次处理
            //二次处理
            //二次处理

            return 三手数据;
        }).then(三手数据 => {
            //三次处理。。。
        }).catch(二手异常 => {
            //二手异常处理
        });
      ```
</details>


4. #### promise实现多异步操作同步（all方法）
<details>
    + all方法要求传入一个可迭代对象作为参数，数组即可
    + 用法：
      ```
        Promise.all([
            new Promise((resolve, reject) => {
                setTimeOut(()=> {
                    resolve(一次数据);
                }, 1000);
            }),
            new Promise((resolve, reject) => {
                setTimeOut(()=> {
                    resolve(二次数据);
                }, 1000);
            })
        ]).then(results => {
            results[0]//一次数据
            results[1]//二次数据
        });
      ```  
    + all中的异步操作，只要有一个调用并触发了`reject()`，会直接执行all的`catch()`方法，但是这并不影响未完成的异步操作
</details>

### vuex
1. #### 什么是vuex，什么是状态管理，vuex的状态响应式（与Vue.prototype的不同），vuex依赖的设计模式
   + vuex是一个状态管理工具，状态管理就是将多个组件需要调用的变量等内容全部存储在一个对象里，实现状态共享和同步
   + Vue.prototype 是通过在父对象中设置变量生成全局变量，实际使用中，如果子组件嵌套层级太多，访问十分困难，并且，这些变量不是响应式的
   + vuex依赖于单例模式
2. #### vuex的使用场景（**学习的前提是了解它解决的问题/使用场景**）
   + 当状态需要在多个界面间共享时，例如用户登录信息，token等
   + 同一个界面中父子组件之间通过props即可共享，不用vuex
3. #### vuex的安装，目录配置、引用与简单使用 
   + `npm install vuex --save` 安装vuex
   + 新建`store`目录，新建`index.js`，引入vue，vuex，并use(vuex),创建vuex对象并导出，代码如下：
     ```
        import Vue from 'vue';
        import Vuex from 'vuex'

        Vue.use(Vuex);

        const store = new Vuex.store({
            state: {
                变量1: 值,
                变量2: 值
            },
            getters: {},
            actions: {},
            mutations: {},
            modules: {}
        });

        export default  store;
     ```
   + 在`main.js`中引入并挂载store
   + 组件模板中通过 `$store.state.变量名`即可访问在state中配置的变量

4. #### vuex的结构和流程，操作跟踪（同步操作/异步操作），devtool
   + ![vuex](https://vuex.vuejs.org/vuex.png) 
   +  vuex与前端其它部分的关系如上图，交互流程必须严格按照上图箭头（交互函数就是箭头上的名字）
      +  注：只有异步操作必须通过actions，否则devtool无法追踪
5. #### 通过简单案例使用vuex并追踪操作
6. #### state单一状态树的概念
7. #### getters的使用：基本操作，作为参数和传入参数
8. #### mutation的使用：组成，参数传递/负载，两种提交风格，响应规则，类型常量
9.  #### 通过actions实现异步操作时devtool与vuex之间的数据同步，结合promise实现回调操作
10. #### modules使用：访问state，mutations，getters和父对象数据，actions中context的指向，对象的解构
    + context指的是函数/方法的执行环境，谁在用这个函数/方法，context指的就是谁  
11. #### 组织store的目录结构，进行代码抽离

## 任务
### promise
1. 用setTimeOut函数代替网络请求，实现简单的异步封装，`then()`传参的两种写法各实现一次
2. 实现非异步链式调用，针对resolve和reject的三种写法各完成一次
3. 实现异步链式调用，必须实现`reject/resolve`方法,任选一种写法，实现以下情境：
   1. then与catch交替出现（then().catch().then().catch())
   2. then与catch分别集中出现(then().then().then().catch().catch())
4. 用`all()`实现多异步操作同步检查

### vuex
1. 
