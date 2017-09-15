<template>
  <div class="cell">
    <label>{{ value }}</label>
    <div class="arrow"></div>
    <div class="line"></div>
  </div>
</template>

<script>

  export default {
    name: 'searchcell',
    props:['value'],
  }

</script>

<style scoped>

  .cell {

    width: 100%;
    padding: 0;
    background-color: white;
    height: 3rem;
    vertical-align: middle;
    position: relative;
  }

  .cell:hover {

    background-color: lightgrey;
  }

  .cell > label {

    display: inline-block;
    vertical-align: middle;
    padding-left: 5%;
    line-height: 3rem;
    color: #030303;
  }

  .arrow {
    background: url("../assets/搜索结果-箭头.png") no-repeat center center /8px 13px;
    width: 8px;
    height: 13px;
    right: 5%;
    margin: auto;
    top: 0;
    bottom:0;
    position: absolute;
    display: inline-block;
  }

  .line {

    width: 90%;
    height: 1px;
    left: 0;
    right:0;
    bottom: 0px;
    margin: auto;
    position: absolute;
    background-color: #d3d9e3;
  }

</style>
