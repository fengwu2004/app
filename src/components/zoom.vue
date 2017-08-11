<template>
  <div class="scale_btn">
    <div v-on:click="zoomout">
      <img src="../assets/zoomout.png">
    </div>
    <div v-on:click="zoomin">
      <img src="../assets/zoomin.png">
    </div>
  </div>
</template>

<script>
  export default {
    name : 'zoom',
    props:['map'],
    methods: {
      zoomout:function() {
        this.map.zoom(0.9)
      },
      zoomin:function() {
        this.map.zoom(1.1)
      },
    }
  }
</script>

<style scoped>

  .scale_btn{
    position: fixed;
    right:1rem;
    bottom:14%;
    z-index: 11;
  }

  .scale_btn div {
    width: 2.5rem;
    height: 2.5rem;
  }

  .scale_btn div img{
    width: 100%;
    height: 100%;
  }

</style>
