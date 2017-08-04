<template>
  <div>
    <div class="bg"></div>
    <div class="content">
      <img class="closeBtn" src="../assets/close1.png" v-on:click="onClose()">
      <img class="tag" src="../assets/car.png">
      <p class="title">输入车位号找车</p>
      <p class="tip">请输入您的车辆所停位置的车位号</p>
      <div id="floors">
        <div class="floor" v-for="floor in floorList" v-bind:key="floor.id">{{ floor.name }}</div>
      </div>
      <input v-model="unitName" placeholder="例：026">
      <p class="errortip" id="errortip">输入有误，请重新输入您的车位号!</p>
      <div class="confirmBtn">确定</div>
      <h5><span>  or  </span></h5>
      <div class="cancelBtn" v-on:click="onCancel()">地图标记</div>
      <br>
    </div>
  </div>
</template>

<script>

  function onClose() {

    this.$el.style.visibility = 'hidden'
  }

  function onCancel() {

    this.onClose()

    this.$emit('onMarkInMap', 1)
  }

  export default {
    name:'findWithUnit',
    props:['floorList'],
    data:function() {
      return {
        unitName:''
      }
    },
    methods:{
      onClose:onClose,
      onCancel:onCancel,
    }
  }
</script>

<style scoped>
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
  }

  .MarkCarWithNum {

    border-radius: 5px;
    background-color: white;
    position: absolute;
    width: 80%;
    top: 20%;
    left:0;
    right:0;
    margin: auto;
  }

  .errortip {

    visibility: hidden;
    width: 80%;
    color: red;
    font-size: 0.5rem;
    margin: auto;
  }

  .closeBtn {

    position: absolute;
    right:9px;
    top:9px;
    width: 0.8rem;
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
    font-size: 0.875rem;
  }

  input {

    border: 1px solid #9D9D9D;
    display: block;
    width: 80%;
    margin: 10px auto 5px;
    line-height: 2rem;
    border-radius: 3px;
    font-size: 1rem;
    padding: 1px 10px;
    font-weight: 100;
    text-align: center;
  }

  input::placeholder {

    color: dodgerblue;
    font-size: 1rem;
    font-weight: 100;
  }

  .errorTip {

    visibility: hidden;
    width: 80%;
    color: red;
    font-size: 0.5rem;
    margin: auto;
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

  .cancelBtn {

    width: 80%;
    background-color: white;
    color: #0086ff;
    text-align: center;
    margin:10px auto 10px;
    line-height: 2rem;
    border-radius: 3px;
    border: 1px solid #0086ff;
    padding: 1px 10px;
  }

  h5 {

    width: 70%;
    margin: auto;
    color: lightgray;
  }

  span {

    line-height: 0.5rem;
    font-weight: 100;
  }

  h5 span:before, h5 span:after {

    display: inline-block;
    content: '';
    vertical-align: bottom;
    height: .4rem;
    line-height: 0.5rem;
    border-top:1px solid lightgray;
    width: 45%;
  }

  #floors {

    text-align: center;
  }

  .floor {

    margin: 5px 10px;
    border: 1px solid #9D9D9D;
    border-radius: 2px;
    line-height: 1.6rem;
    font-size: 0.6rem;
    font-weight: 300;
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
  }

  .floorSelected {

    background-color: #0086ff;
    color: white;
    border: 1px solid #0086ff;
  }

  .floor:enabled {

    color: red;
  }
</style>
