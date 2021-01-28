1. #### 上拉加载bug的解决
  + scrollheight属性存放了content组件的高度，由于图片加载延迟导致其高度与实际不符合
  + 实际使用中监听每张图片是否加载完成，每次都重新计算scrollheight
    + 原生js监听图片加载：`img.onload=function(){}`
    + vue封装的监听属性`@load='方法名'`
  + 解决方案有三种：
    1. 子组件向父组件，父组件向根组件层层发射事件，执行`scroll.refresh()`
    2. 通过单一状态树(vuex)的某个变量实现事件监听
    3. 使用**事件总线**发射和接收事件
       ```
        //总线的创建main.js
        Vue.prototype.$bus = new Vue();

        //总线发射事件goodsItem.vue
        this.$bus.$emit('itemImgLoaded');

        //总线接收事件home.vue,一般放在created中绑定监听
        this.$bus.$on('itemImgLoaded', 处理方法);
       ``` 
  + 优化：refresh调用过于频繁，使用**防抖函数**
    + **settimeout中的异步操作会被放到事件循环的最后，所以就算没有设置延迟时间，它也不会在调用的顺序中执行**
    + **func.apply(context[, args])可以将传入的上下文当作函数的执行上下文，并在该前提下执行函数**
    + 回调函数相当于闭包，其中引用的变量可以在该回调函数执行的时候访问，并不会被限制在声明作用域中
    + 防抖函数(debounce)的定义和调用代码如下：
      ```
        //定义
        debounce(func, delay){
          let timer = null;
          return (...args)=>{
            if(timer) clearTimeout(timer);
            timer = setTimeout(
              ()=>{
                func.apply(this, args)
            },delay);
          }
        }
        //调用
        refresh = this.debounce(this.$refs.scroll.refresh, 300);
        this.$bus.$on('itemImgLoaded', ()=>{
          refresh();
        });
      ```
    + 应另行封装防抖函数至 utils.js
  + 引出的其它bug：
    1. created中设置的图片加载触发的refresh有可能先于scroll中scroll对象的生成,所以在执行的时候可以用`this.scroll&&this.scroll.refresh()&&this.处理方法`来确定scroll.refresh方法已经存在
    2. 也可以在`mounted`中设置事件监听
  + 完善上拉加载：
    + pullUpLoad应该在home组件中配置，因为scroll组件是要多处调用的
    + 根据pullUpLoad值来确定是否监听`pullingup`
    + 避免直接访问/修改子组件的属性，有需要都建议通过封装的子组件方法来实现，尤其是第三方组件的属性，在源码外是不可见的，封装能够更好地解耦，代码也更容易理解
2. tabcontrol 吸顶效果的实现
  + 所有组件对象都有`$el`属性，用来访问组件中的所有元素
  + 访问组件元素的`offSetTop`时，由于是在mounted中访问，图片可能没有加载完，所以值会偏小
  + 判断tabcontrol的offSetTop值变化来修改fixed属性时，由于betterscroll的transform和translate属性变化影响，会出现tabcontrol消失和图片瞬移现象，所以实际吸顶效果是通过额外tabcontrol组件根据原组件offsettop变化设置v-show来实现的
  + 要注意同步两个tabcontrol当前选中的goodstype