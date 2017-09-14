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
    data: function() {
      return {
        _time:null
      }
    },
    methods: {
      zoomout:function() {

        var time = (new Date()).getTime()

        if (!this._time || time - this._time > 1000) {

          this.map.zoom(0.75)

          this._time = time
        }
      },
      zoomin:function() {

        var time = (new Date()).getTime()

        if (!this._time || time - this._time > 1000) {

          this.map.zoom(1.35)

          this._time = time
        }
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
