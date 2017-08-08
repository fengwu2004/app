<template>
  <div class="main">
    <div class="bg" v-on:click="onClose"></div>
    <div class="content">
      <div class="closeBtn" v-on:click="onClose"></div>
      <img class="tag" src="../assets/car.png">
      <p class="title">输入车位号找车</p>
      <p class="tip">请输入您的车辆所停位置的车位号</p>
      <div class="floors">
        <div v-for="floor in floorlist" v-bind:key="floor.id" class="floor" v-bind:class="getFloorStyle(floor.id)" v-on:click="onSelectFloor(floor.id)">{{ floor.name }}</div>
      </div>
      <input v-model="unitName" placeholder="例：026">
      <p class="errortip" v-bind:style="{visibility:errortipVisible}">输入有误，请重新输入您的车位号!</p>
      <div class="confirmBtn" v-on:click="onConfirm">确定</div>
      <h5><span>  or  </span></h5>
      <div class="cancelBtn" v-on:click="onCancel()">地图标记</div>
      <br>
    </div>
  </div>
</template>

<script>

  function onClose() {

    this.$emit('onclose', 2)
  }

  function onCancel() {

    this.onClose()

    this.$emit('onmarkinmap')
  }

  function onConfirm() {

    var units = this.map.findUnitWithName(this.selectedFloorId, this.unitName)

    if (!units) {

      this.findError = true
    }
    else {

      this.onClose()

      this.$emit('onfindunits', units)
    }
  }

  function onSelectFloor(floorId) {

    this.selectedFloorId = floorId

    this.map.autoChangeFloor = false

    this.map.changeFloor(floorId)
  }

  function getFloorStyle(floorId) {

    if (floorId === this.selectedFloorId) {

      return 'floor floorSelected'
    }
    else {

      return 'floor'
    }
  }

  export default {
    name:'findwithunit',
    props:['map'],
    data:function() {
      return {
        unitName:'',
        findError:false,
        floorlist:this.map.regionEx.floorList,
        selectedFloorId:this.map.getFloorId()
      }
    },
    computed:{
      errortipVisible:function() {
        if (this.findError) {
          return 'visible'
        }
        return 'hidden'
      },

    },
    methods:{
      onClose:onClose,
      onCancel:onCancel,
      onConfirm:onConfirm,
      onSelectFloor:onSelectFloor,
      getFloorStyle:getFloorStyle
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

  .errortip {

    width: 80%;
    color: red;
    font-size: 0.5rem;
    margin: auto;
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

    width: 80%;
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

  .floors {

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
