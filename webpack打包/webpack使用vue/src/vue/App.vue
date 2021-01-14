<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <button @click="btnClick()">按钮</button>
    <Cpn/>
  </div>
</template>

<script>
import Cpn from "./Cpn.vue";
export default {
  //name只是用来给人看的，有没有没啥区别
  name: "App",
  data(){
    return {
      title: "主页面标题"
    };
  },
  methods: {
    btnClick(){
      console.log("我被点了");
    }
  },
  components: {
    Cpn  
  }

}
</script>

<style scoped>
/* scoped防止样式扩散，限制在标签子元素和父元素之中 */
  .title {
    color: green;
  }
</style>