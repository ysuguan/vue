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
      ```
        //插件的挂载实际上是执行了Vue.prototype.$store = store

        import store from './store'
        new Vue({
            el: '#app',
            router,
            store,
            render: h=> h(App)
        });
      ```
   + 组件模板中通过 `$store.state.变量名`即可访问在state中配置的变量

4. #### vuex的结构和流程，操作跟踪（同步操作/异步操作），devtools
   + ![vuex](https://vuex.vuejs.org/vuex.png) 
   +  vuex与前端其它部分的关系如上图，交互流程必须严格按照上图箭头（交互函数就是箭头上的名字）
      +  注：异步操作修改状态必须通过actions，否则devtool无法追踪
   + devtools 是chrome插件，翻墙安装
5. #### 通过简单案例使用vuex并追踪操作
   + mutations中定义的方法默认传入一个state参数，这个参数就是store中的全局变量state,下方代码是在store/index.js中定义一个mutaions的方法
      ```
        mutations: {
            increment(state) {
                state.counter++;
            }
        }
      ```
    + 外部访问mutations中的方法必须通过`store.commit()`方法。**这里的方法名可以用来对照上图中的控制流程箭头名**
        ```
            store.commit('increment');
        ```
6. #### state单一状态树的概念
   + single source of truth,也就是单一数据源
   + 即使有很多的信息需要管理，也建议只用一个store对象来管理
7. #### getters的使用：基本操作，作为参数和传入参数
    + getters 类似组件中的计算属性
    + getters中定义的函数也有一个默认参数state，同mutations，使用如下：
       ```
          getters: {
              powerCounter(state) {
                  return state.counter * state.counter;
              }
          }

          //访问getters

          $store.getters.powerCounter
       ```
     + getters中的方法通过将getters作为第二个参数传入，就可以访问其他的getters方法
        ```
            getters: {
                getter1(state){return ...},
                getter2(state, getters){
                    console.log(getters.getter1)
                    return ...
                }
            }
        ```
     + getters中的方法可以通过返回回调函数来响应式处理数据
       ```
        getters: {
            getter1(state) {
                return (自定义数据) => {
                    return 自定义数据与state数据的处理结果;
                }
            }
        }
       ```
8. #### mutations的使用：组成，参数传递/负载，两种提交风格
    + vuex中store状态的更新**唯一方式**是：commit一个mutations方法
    + mutations的组成:字符串的事件类型，回调函数
    + mutations方法接受参数只要在声明时传入第二个参数即可，参数被称为mutations的`payload(负载)` ,它是一个对象  
    + 调用mutations方法可以有两种commit风格
      + 第一种：上面提过的，commit('事件类型’, 参数)
      + 第二种：这种方法传递过去的参数会变成`{type:'事件类型',参数名:参数}`
        ```
            this.$store.commit({
                type: 'mutations1',
                参数[:参数值]
            });

            //访问传入参数
            mutations1(state, payload) {
                console.log(payload.参数);
            }
        ```
9.  #### 响应规则，类型常量
    + **响应规则**： vuex中，只有在store定义时赋值的属性才会被添加到响应式系统中，后续通过简单赋值添加的属性均不是响应式的。然而即使是响应式系统中的属性，通过`delete` 删除仍然不会得到响应式反馈，只有通过如下方法增删，才能将后来属性加入响应式系统中或即时删除属性
      + 注意:vue中数组也只有一些方法是响应式的
      ```
        //响应式增加属性
        Vue.set(state.属性, 要添加的子属性名, 要添加的子属性值);    
        //响应式删除
        Vue.delete(state.属性, 要删除的子属性名);
      ```
    + **类型常量**是为了解决mutations中方法太多并且使用频繁而导致的名称易错问题，实际使用是在`mutations-types.js`文件中定义常量名和方法名映射，并导出，在使用和定义mutations方法时都通过常量操作
        ```
            //mutations-types.js中
            export const INCREMENT = 'increment';

            //store/index.js定义时
            import {INCREMENT} from './mutations-types.js';
            ......
                mutations: {
                    [INCREMENT] (state){
                        ...
                    }
                }

            //在组件中使用时
            this.$store.commit(INCREMENT);
        ```
10. #### 通过actions实现异步操作时devtool与vuex之间的数据同步，结合promise实现回调操作
    + 异步操作无法被devtools追踪，所以不要在mutations中进行任何异步操作
    + actions中的方法默认接受一个context参数，是方法的执行上下文，上下文的理解参考下方`11`条
    + actions中修改state也必须通过commit调用mutations

      ```
        //简单定义actions
        actions: {
            act1(context){
                setTimeout(()=>{
                  context.commit('mutations方法名');
                }, 1000);
            }
        }
        //简单调用actions
        this.$store.dispatch('actions方法名');

        //通过回调函数在mutations执行结束后做进一步操作
        //进阶定义actions：
        act1(context, 回调函数参数){
                setTimeout(()=>{
                  context.commit('mutations方法名');
                  回调函数参数();
                }, 1000);
        }
        //进阶调用actions
        this.$store.dispatch('actions方法名', ()=>{后续操作});

        //通过promise作为回调，进一步调整代码结构
        //终极定义
        act1(context){
            return new Pormise((resolve, reject)=> {
                setTimeout(()=>{
                    context.commit('mutations方法名');
                    resolve();
                }, 1000);
            });
        }
        //终极调用
        this.$store.dispatch('actions方法名').then(res => {
            进一步处理代码...
        });
      ```
11. #### modules使用：访问state，mutations，getters和父对象数据，actions中context的指向，对象的解构
    + context指的是函数/方法的执行环境，谁在用这个函数/方法，context指的就是谁  
    + 由于vue建议单一状态树，store会变得很臃肿，所以vuex支持通过modules进行模块划分
       ```
        //定义
        const moduleA = {
            state: {
                //与父级内容相互独立
                },
            mutations: {
                只能访问本级state
                },
            actions: {
                //可以通过context访问root中的内容，具体可以通过打印context观察
            },
            getters: {
                //通过传入的第三个参数rootState可以访问父级state
                getFunc(state, getters, rootState) {
                    console.log(rootState.父级属性名);
                }
            },
            //一般不在模块中再划分模块
            modules:{}
        }
        const store = new Vuex.store({
            state:{},
            ...
            modules: {
                a: moduleA
            }
        });

        //访问
        $store.state.a.state属性
        //其他方法的访问都和父级一样，因此，父子模块中的方法名不能重复
       ```
    + 向actions方法中传参可以通过对象的结构完成
      ```
        //对象的解构示例代码
        const obj = {
            name: 'haha',
            age: 12,
            height: 199
        }
        const {name, height, age} = obj

        //actions中的使用
        act1({state, commit, rootState}){
            ...
        }
      ```
12. #### 组织store的目录结构，进行代码抽离
    + mutations、getters、actions都在store下抽出单独的文件放置
    + modules新建一个目录，根据模块抽离各个module再导入
    + rootState不抽离

## 任务
### promise
1. 用setTimeOut函数代替网络请求，实现简单的异步封装，`then()`传参的两种写法各实现一次
2. 实现非异步链式调用，针对resolve和reject的三种写法各完成一次
3. 实现异步链式调用，必须实现`reject/resolve`方法,任选一种写法，实现以下情境：
   1. then与catch交替出现（then().catch().then().catch())
   2. then与catch分别集中出现(then().then().then().catch().catch())
4. 用`all()`实现多异步操作同步检查

### vuex
1. 安装devtools,安装vuex，配置vuex目录结构，引入vuex，运行测试项目，直接访问并修改store中的变量，通过devtools观察全局state变化
2. 通过在mutations中定义方法修改state中的值，并通过devtools观察每次执行mutations方法时state的变化
3. 使用getters筛选一组学生中年龄大于20岁的并在页面上显示,并通过getters显示符合条件的学生个数,实现一个getters方法，能够根据自定义数字返回年龄比之大的学生列表
   + 注意：箭头函数的函数体如果被`{}`包裹，必须用return来传递返回值
4. 定义一个mutations方法，能自定义的修改store中的值,使用第二种提交风格，并观察参数的变化
5. 在调用时向store中添加一个新的属性，观察页面变化；然后通过响应式添加执行同类操作，观察页面变化;再使用delete删除store中的一个属性，观察页面变化；最后通过响应式删除store属性，观察页面变化
6. 定义超过一个类型常量并使用
7. 执行一个异步操作改变state并使devtools能追踪到该操作，再使用两种方法在异步操作完成后执行可变的的收尾工作。并尝试通过对象解构方式针对性传入参数
8. 定义一个module，分别访问其中的state、mutations、actions、getter；再通过module中的各种方法尝试访问父级属性/方法
   + 子模块中的mutations方法中的`this`指向父级，actions方法的`context`参数指向子模块自身
9.  调整代码解构
