<template>
  <div v-bind:style="{opacity:opacity}">
    <img src="../assets/errortip.png">
    <span>{{ message }}</span>
  </div>
</template>

<script>
 export default {
   name: 'errortipview',
   props: ['message', 'opacity']
 }
</script>

<style scoped>

  div {
    padding: 0;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background: rgba(255, 240, 204, 0.8);
    font-size: 0.85rem;
    border-bottom: 1px solid #cccccc;
    z-index: 11;
    transition: opacity 1s;
    -webkit-transition: opacity 1s;
  }

  img {
    padding: 0 10px;
    width: 1.3rem;
    height: 1.3rem;
    display: inline-block;
    line-height: 2rem;
    vertical-align: middle;
  }

  span {

    line-height: 2rem;
    height: 2rem;
    display: inline-block;
    vertical-align: middle;
  }

</style>
