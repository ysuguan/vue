### promise
1. #### promise是什么，回调函数的含义
2. #### 基本语法（两种写法），链式编程，构造方法参数的含义
3. #### 非异步链式调用与三种写法
4. #### promise实现多异步操作同步

### vuex
1. #### 什么是vuex，什么是状态管理，vuex的状态响应式（与Vue.prototype的不同），vuex依赖的设计模式
2. #### vuex的使用场景（**学习的前提是了解它解决的问题/使用场景**）
3. #### vuex的安装，目录配置和引用
4. #### vuex的结构和流程，操作跟踪（同步操作/异步操作），devtool
    ![vuex](https://vuex.vuejs.org/vuex.png) 
5. #### 通过简单案例使用vuex并追踪操作
6. #### state单一状态树的概念
7. #### getters的使用：基本操作，作为参数和传入参数
8. #### mutation的使用：组成，参数传递/负载，两种提交风格，响应规则，类型常量
9.  #### 通过actions实现异步操作时devtool与vuex之间的数据同步，结合promise实现回调操作
10. #### modules使用：访问state，mutations，getters和父对象数据，actions中context的指向，对象的解构
    + context指的是函数/方法的执行环境，谁在用这个函数/方法，context指的就是谁  
11. #### 组织store的目录结构，进行代码抽离