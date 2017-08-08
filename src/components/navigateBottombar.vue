<template>
  <div class="main">
    <img class="quit" src="../assets/quit.png" v-on:click="exit(false)"/>
    <div class="route" v-for="router in routers" v-bind:key="router.id"><span>{{ router.name }}</span><img src="../assets/jiantou.png"/></div>
    <span>终</span>
  </div>
</template>

<script>

  function show(enable) {

    if (enable) {

      this.$el.style.visibility = 'visible'
    }
    else {

      this.$el.style.visibility = 'hidden'
    }
  }

  export default {
    name : 'navigatebottombar',
    props:['routers'],
    methods: {
      exit:function() {
        this.$emit('onexit', true)
      },
      click:function(value) {
        var el = event.target
        el.disabledenable = true
      }
    }
  }

</script>

<style scoped>

  .main {
    width: 100%;
    height: 1.5rem;
    padding: 0.8rem 0;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: #0b79f2;
    text-align: center;
  }

  .route {

    display: inline-block;
  }

  span {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin:0 5px;
    font-size: 0.8rem;
    line-height: 1.5rem;
    font-family: ".SF NS Display";
    color: white;
    border-radius: 50%;
    border: 1px solid white;
  }

  span:first-child {

    background-color: white;
    color: #0b79f2;
  }

  .quit {
    width: 1.2rem;
    height: 1.2rem;
    left: 1rem;
    top:0;
    bottom: 0;
    margin: auto;
    position: absolute;
    background: url("../assets/quit.png") no-repeat;
    background-size: contain;
  }

  img {
    display: inline-block;
    line-height: 1.5rem;
    width: 50px;
  }

</style>
