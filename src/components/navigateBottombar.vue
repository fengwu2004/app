<template>
  <div class="main">
    <div class="routerpos">
      <div class="pos" v-for="router in routers" v-bind:key="router"><span v-bind:key="router" v-on:click="click()">{{ router }}</span>
      </div>
    </div>
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

  function select(el, parentNode) {

    var spans = parentNode.getElementsByTagName('span')

    for (var i = 0; i < spans.length; ++i) {

      var span = spans[i]

      if (span === el) {

        span.classList.add('span_selected')
      }
      else {

        span.className = ''
      }
    }
  }

  export default {
    name : 'navigatebottombar',
    props:['routers'],
    methods: {
      show:show,
      click:function() {

        var el = event.target

        select(el, this.$el)
      }
    }
  }

</script>

<style scoped>

  .main {
    width: 100%;
    height: 2rem;
    padding: 0.8rem 0;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: #18202a;
    text-align: center;
  }

  .routerpos {

    display: flex;
    width: 80%;
    left: 0;right: 0;
    margin: auto;
    height: 100%;
  }

  span {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin:0 3px;
    font-size: 1rem;
    line-height: 2rem;
    font-family: ".SF NS Display";
    color: white;
    border-radius: 50%;
    border: 1px solid white;
  }

  .span_selected {
    color: red;
  }

  .pos {
    flex: 1;
    display: inline-block;
    /*text-align: center;*/
  }

  .start {

    background-color: white;
    color: #0b79f2;
  }

  .quit {
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    position: absolute;
    background: url("../assets/quit.png") no-repeat;
    background-size: contain;
  }

  img {
    line-height: 1.5rem;
    width: 50px;
  }

</style>
