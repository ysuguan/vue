## 笔记
### 需要注意项目开发中的操作顺序（从`2`开始）
1. #### 用vue-cli3搭建商城项目，使用git跟踪，并与github对应仓库关联
   ```
    //生成项目
    vue create 项目名
    //运行项目
    cnpm/npm run serve
    //关联远程仓库
    git remote add 给远程仓库取个本地名字 远程仓库地址
    //推送的同时设置远程仓库为本地仓库的上游,省去github上的compare&pullrequest 提示
    git push 远程仓库名 远程分支名 -u
   ```
2. #### 划分目录结构，主要调整`src`中的目录结构
  ```
    + src
    |
    |---+ assets
    |   |
    |   |---+ img
    |   |---+ css
    |       |
    |       |---+ base.css
    |       |---+ normalize.css          
    |
    |---+ common //公共js文件，放置常量、函数、工具类 
    |
    |---+ components //跨模块组件
    |   |
    |   |---+ common //跨项目可用的基础组件
    |   |---+ content //本项目定制的跨模块组件
    |
    |---+ network
    |
    |---+ router
    |
    |---+ store
    |
    |---+ views
        |
        |---+ category
        |---+ home
        
  ```

3. #### 引入normalize.css,这是为了同一不同浏览器对html标签的显示效果，同时定义自己的base.css，对全局样式做统一。
   + 先在base中引入normalize.css，后续只要在App.vue中引入base.css即可
   + base.css中定义一些基本样式的变量,css中也可以定义变量
    ```
      //获取html元素
      :root {
        --color-text: #666;
        --color-high-text: #ff5777;
        --color-tint: #ff8198;
        --color-background: #fff;
        --font-size: 14px;
        --line-height: 1.5;
      }
    ```
4. #### 在vue.config文件中设置别名；配置.editorconfig统一项目代码风格
    ```
      //vue.config内容
      module.exports = {
        configureWebpack: {
          resolve: {
            extension: [],//默认配置过了，不用管
            alias: {
              //src目录已经默认设置'@'为别名
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'views': '@/views',
              'network': '@/network',
            }
          }
        }
      }
    ```
    
5. #### 引入tabbar，修改相关配置，设置路由，划分项目模块
   + router需要重新安装的就重装一下
6. #### 首页导航栏的开发、样式设置与封装
   + public 相当于cli2中的static，其中内容会被原封不动地放到dist下
   + naviBar样式css代码：
     ```
      .nav-bar {
        display: flex;
        height: 44px;//只有line-height无内容时不显示
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
      }
      .left, .right {
        width: 60px;
      }
      .center { 
        flex: 1;
      }
     ```
7. #### 请求首页需要的multidata,拆分网络请求库，配置home对应的网络模块，在网络模块的回调函数中使用this暂存数据
   + 网络请求应该封装一个中间层，对url集中管理，避免在组件页面过多处理url内容，同时也可以集中管理url
8. #### 开发轮播图组件，swipper和swipperItem分别封装，通过一个js文件集中导出；封装主页定制轮播图，主页只把控主体结构，细节交给封装模块
9.  #### 开发推荐信息组件，教程中只封装了recommandInfo，~~实际应该可以额外封装一个商品简介组件，跨模块可用，能自定义图片形状和尺寸，文字大小颜色之类~~
    + 封装`recommandview`组件，props传入`recommands`数据
      + 注意：props中对数组和对象设置默认值要用函数返回值形式 
         ```
          type: Array,
          default (){
            return []
          }
         ``` 
10. #### 开发featureview组件，因为是一整张图片，所以就简单展示一下，调整样式就可以了
    + 仍然需要封装成一个组件，图片不是网络请求的，在老师代码里复制一份。因为点击可以跳转，所以外包一个a标签
    + 调整下拉带来的一些视觉问题：导航栏固定，页底显示（通过追加一坨ul>li实现)    
11. #### 首页tabbar封装(业务组件)，切换文字状态改变，和吸顶效果
    + 因为tabbarcontrol在不同页面**只是文字不一样，所以不用设置插槽，只在样式不一样的时候预留插槽**
    + 通过props传入文字，通过`position:sticky`实现吸顶效果（最终实现不是这样，这种方式在bscroll中会失效
    + 公共组件、子组件、额外方法的引入语句要分开管理
12. #### 请求首页商品分类数据，created调用的方法另行封装，了解push的可变参数传参。
    + 数据结构：
       ```
          goods: {
            'pop': {
              page: 0,
              list: []
            },
            'new': {
              page: 0,
              list: []
            }
          }
       ```
      + 将一个数组追加到另一个数组，可以通过`arr.push(...arr2)`这种方式，arr2就以可变参数形式被传入
13. #### goodslist、goodslistitem封装，因为是业务相关组件，可以通过props层层传递数据；格式也相对固定，所以不用留插槽
    + 由于vue的组件复用，所以通过tabbarconrol切换分类时，图片可能没变化，通过对goodslist绑定key来解决这个问题
    + 应为直接传入了数据，所以不用针对模块再做封装，home模块直接调用goodslist组件即可
    + 收藏图标在老师源码里找
14. #### tabcontrol 向父组件发射点击事件，实现goodslist内容切换展示
    + goodslist只有一个，只是因为使用的数据不同展示的内容才会变化 
15. #### 移动端访问站点，观察滚动效果，引入[better-scroll框架](https://better-scroll.github.io/docs/zh-CN/guide/use.html)，对比效果
    + better-scroll官网未提供下载入口，github上搜索该框架，选择最新tag，进入dist找到编译好的源码，.js是支持script标签引入的格式；.esm.js是esmodule格式，支持项目中导入；.min.js是压缩格式。也可以通过npm安装
    + 使用原生滚动实现局部滚动，再使用better-scroll实现局部滚动，注意，控制dom的时机应当在组件挂载模板之后
      ```
        this.scroll = new BScroll(wrapperElement,{})
      ```
    + better-scroll 要求可滚动内容在一个父级标签中，该标签被放置在一个用作容器的标签中
    + better-scroll 实现侦测滚动位置，动态展示回到顶部按钮，`probetype=2/3侦测位置，0/1不侦测`,定位触发命令`bscroll.on('scoll', (position) =>{...})`
    + better-scroll 配置上拉加载更多`pullUpLoad: true`，配置命令与触发命令`bscroll.on('pullingup', () => {...})`不一样，触发一次之后一定要调用pullupfinished方法来重置触发，否则后续上拉无法加载
    + 解除代码对第三方框架的依赖，封装自定义的滚动模块代码（组件形式），滚动区域的样式在使用该组件的地方设置
    + 用`ref`来绑定子组件或子组件中的标签，可以通过`this.$refs`来直接访问指定对象
        + 这个属性是为了避免父子组件中出现重名的标签，因为不同的组件中`this.$refs`指向的对象是不同的
    + 所有html页面中图片都是异步加载的，所以betterscroll计算含图片的标签的尺寸时会出错，如果图片没有即时加载出来，会导致无法上滑。所以在图片加载完之后再执行`scroll.refresh()`刷新`content`窗口尺寸,**在scroll组件mounted中绑定wrapper时，也可能出现因尺寸错误无法上滑的情况，设置一个延时绑定就可以**
16. #### 回到顶部按钮封装，需要注意，组件不能直接设置监听事件，必须使用`native`修饰符来监听组件根元素原生事件
    + **注意：`@click`不要在组件标签中绑定， 去组件内部绑定，否则无效**

  