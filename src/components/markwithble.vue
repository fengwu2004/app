<template>
  <div class="main">
    <div class="bg" v-on:click="onClose"></div>
    <div class="content">
      <div class="closeBtn" v-on:click="onClose"></div>
      <img class="tag" src="../assets/bluetooth_img.png">
      <p class="title">蓝牙自动标记</p>
      <p class="tip">标记当前位置{{ unit.name }}为停车位置</p>
      <div class="confirmBtn" v-on:click="onConfirm">确定</div>
      <br>
    </div>
  </div>
</template>

<script>

  function onClose() {

    this.$emit('close', '')
  }

  function onConfirm() {

    this.$emit('confirm', '')
  }

  export default {
    name:'markwithble',
    props:['unit'],
    methods:{
      onClose:onClose,
      onConfirm:onConfirm,
    }
  }
</script>

<style scoped>

  .main {
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:0;
  }

  .bg {
    background-color: #9D9D9D;
    left: 0;
    top: 0;
    right: 0;
    bottom:0;
    position: absolute;
    margin: 0;
    opacity: 0.4;
    z-index: 2;
  }
  .content {
    border-radius: 5px;
    background-color: white;
    position: absolute;
    width: 80%;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 100;
  }

  .closeBtn {

    position: absolute;
    right:10px;
    top:10px;
    width: 3rem;
    height: 3rem;
    background-size: 1rem;
    background: transparent no-repeat center url("../assets/close1.png");
  }

  .tag {

    display: block;
    left: 0;right: 0;
    margin: -4.5rem auto;
    width:9rem;
    height:9rem;
  }

  .title {

    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0;
    padding: 5rem 0 10px 0;
  }

  .tip {

    text-align: center;
    margin: 0 auto;
    padding-bottom: 10px;
    color: #9D9D9D;
    font-weight: 200;
    font-size: 0.7rem;
  }

  .confirmBtn {

    width: 80%;
    background-color: #0086ff;
    color: white;
    text-align: center;
    margin:10px auto;
    line-height: 2rem;
    border-radius: 3px;
    border: 2px solid #0086ff;
    padding: 0px 10px;
  }

</style>
