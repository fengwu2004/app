<template>
  <div class="main">
    <div class="bg" v-on:click="onClose"></div>
    <div class="content">
      <div class="closeBtn" v-on:click="onClose()"></div>
      <img class="tag" src="../assets/car.png">
      <p class="title">车牌找车</p>
      <p class="tip">请输入您的车牌号</p>
      <input v-model="carnumber" placeholder="例：粤B NB001">
      <p class="errorTip" style="visibility: hidden;">该车辆不在此停车场，请确认车牌号!</p>
      <div class="confirmBtn" v-on:click="onConfirm()">确定</div>
      <h5><span>  or  </span></h5>
      <div class="cancelBtn" v-on:click="onCancel()">输入车位号找车</div>
      <br>

    </div>
  </div>
</template>

<script>

  import indoorun from '../../../indoorunMap/map.js'

  const idrNetworkInstance = indoorun.idrNetworkInstance

  function onClose() {

    this.$emit('onclose', '0')
  }

  function onFindbyUnit() {

    this.onClose()

    this.$emit('onclose', 1)
  }

  function onConfirm(self) {

    console.log(self.carnumber)

    const url = indoorun.idrNetworkInstance.host + 'chene/getParkingPlaceUnitByCarNo.html'

    var data = {
      'regionId': self.map.getRegionId(),
      'carNo': self.carnumber,
      'floorId': self.map.getFloorId(),
    }

    idrNetworkInstance.doAjax(url, data, function(res) {

      var data = res.data

      var unit = new indoorun.idrUnit(data.parkingUnit)

      self.map.doRoute(self.map.getUserPos(), unit.getPos())

    }, function(res) {


    })
  }

  export default {
    name:'findwithnum',
    props:['map'],
    data:{
      carnumber:''
    },
    methods: {
      onClose:onClose,
      onConfirm:function() {

        this.onClose()

        onConfirm(this)
      },
      onCancel:onFindbyUnit,
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
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 0;
    background-color: #9D9D9D;
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
    right:1px;
    top:1px;
    width: 3rem;
    height: 3rem;
    background-size: 1rem;
    background: no-repeat center url("../assets/close1.png");
  }

  .tag {
    display: block;
    left: 0;
    right: 0;
    margin: -4.5rem auto;
    width: 9rem;
    height: 9rem;
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
    margin: 10px auto;
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
    margin: 10px auto 10px;
    line-height: 2rem;
    border-radius: 3px;
    border: 1px solid #0086ff;
    padding: 1px 10px;
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

  span {
    line-height: 0.5rem;
    font-weight: 100;
  }

  h5 {
    width: 80%;
    margin: auto;
    color: lightgray;
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

</style>
