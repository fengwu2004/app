<template>
  <div class="pointRev" v-bind:style="{left:x,top:y}">
    <div class="pointDelete">
      <img src="../assets/pointDelete.png" v-on:click="onDelete">
    </div>
    <div class="box1">
      <div class="pointCha">
        <img src="../assets/pointCha.png" v-on:click="onChangePos">
      </div>
      <div class="sharePoint">
        <img src="../assets/pointShare.png" v-on:click="onShare">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'updatemarkerview',
    props:['x', 'y'],
    methods: {
      onDelete:function() {

        this.$emit('ondelete', '')
      },
      onChangePos:function() {

        this.$emit('onchangepos', '')
      },
      onShare:function() {

        this.$emit('onshare', '')
      },
    }
  }

</script>

<style scoped>

  .pointRev{
    width: 120px;
    height:90px;
    position: absolute;
    z-index: 30;
  }

  .pointDelete,.pointCha,.sharePoint{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .box1{
    margin-top: -4px;
  }

  .box1::after{
    content: "";
    width: 0;
    height: 0;
    display: block;
    clear: both;
  }

  .pointDelete{
    margin: 0 auto;
  }

  .pointCha{
    float: left;
  }

  .sharePoint{
    float: right;
  }

  .pointDelete img{
    width: 100%;
  }

  .pointCha img{
    width: 100%;
  }

  .sharePoint img{
    width: 100%;
  }

</style>
