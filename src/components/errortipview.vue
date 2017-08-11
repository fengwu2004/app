<template>
  <div>
    <img src="images/icon1.png">
    <span>{{ message }}</span>
  </div>
</template>

<script>
 export default {
   name: 'errortipview',
   props: ['message']
 }
</script>

<style scoped>

  div {
    padding: 0 5%;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background: none repeat scroll 0 0 rgba(255, 240, 204, 0.8);
    font-size: 0.85rem;
    border-bottom: 1px solid #cccccc;
    z-index: 11;
  }

  img {
    width: 1.3rem;
    height: 1.3rem;
    margin-top: 0.3rem;
    margin-right: 10px;
  }

  span {

  }
</style>
