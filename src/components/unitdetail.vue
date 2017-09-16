<template>
  <div class="main">
    <div class="unitname">
      <label>{{ unit.name }}</label>
    </div>
    <div class="navigate" v-on:click="setStart">
      <div class="left">
        <img src="../assets/设为起点-icon.png" width="20px" height="20px">
        <label>设为起点</label>
      </div>
      <div class="right" v-on:click="setEnd">
        <img src="../assets/设为终点-icon.png"  width="20px" height="20px">
        <label>设为终点</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unitdetail',
  props:['unit'],
  methods: {
    setStart:function() {
      this.$emit('setstart')
    },
    setEnd:function() {
      this.$emit('setend')
    }
  }
}
</script>

<style scoped>

  .main {

    width: 100%;
    position: absolute;
    height: 100px;
    bottom: 0px;
    background-color: #ffffff;
  }

  .main > div {

    height: 50px;
  }

  .unitname {

    border-bottom:1px solid #dad9e3;
    box-shadow: 0px -1px 2px rgba(44, 44, 44, 0.25);
  }

  .unitname > label {

    display: inline-block;
    position: absolute;
    line-height: 50px;
    left: 25px;
    font-size: 1.5rem;
  }

  .navigate {

    display: flex;
    display: -webkit-flex;
  }

  .navigate div {

    width: 50%;
    height: 100%;
    color: #434969;
    text-align: center;
  }

  .navigate label {

    line-height: 50px;
    padding-left: 14px;
    vertical-align: middle;
  }

  .navigate img {

    line-height: 50px;
    display: inline-block;
    vertical-align: middle;
  }

  .left {

    border-right: 1px solid #d3d9e3;
  }

</style>
