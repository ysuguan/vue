<template>
  <div>
    <h2 class="title">{{title}}</h2>
    等待输入：<input type="text" :value="content">
  </div>
</template>

<script>
export default {
  name: "Cpn",
  data(){
    return {
      title: "子组件标题",
      content: "预置内容"
    };
  }
}
</script>
<style scoped>
  .title {
    color: red;
  }
</style>