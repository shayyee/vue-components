<template>
  <div class="vue-loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped>
  .vue-loading {
    width: 100%;
    text-align: center;
  }
  .vue-loading img {
    width: 20px;
    height: 20px;
    display: block;
  }
  .vue-loading .desc {
    line-height: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
