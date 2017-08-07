<template>
  <div class="main">
    <div class="bg" v-on:click="onClose"></div>
    <div class="content">
      <img class="tag" src="../assets/public_img.png">
      <div class="closeBtn" v-on:click="onClose"></div>
      <p class="title">公共设施</p>
      <p class="tip">智能搜索 一键导航 规划最短路线</p>
      <h5><span>  搜一下  </span></h5>
      <div class="facilities">
        <facilitybtn class="facility" v-for="facility in facilities" v-bind:key="facility.type" v-bind:item="facility" v-on:onclickunitwith="onClickUnit"></facilitybtn>
      </div>
    </div>
  </div>
</template>

<script>

  import facilitybtn from './facilitybtn.vue'

  export default {
    name :'findfacilityview',
    props:['facilities'],
    methods:{
      onClose:function() {
        this.$root.$el.style.visibility = 'hidden'
      },
      onClickUnit:function(type) {
        this.onClose()
        this.$emit('onnavigateto', type)
      }
    },
    components: { facilitybtn }
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
    left:0;
    right:0;
    width: 80%;
    top: 20%;
    margin:auto;
    z-index: 2;
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

  .tag {
    display: block;
    left: 0;
    right: 0;
    margin: -4.5rem auto;
    width: 9rem;
    height: 9rem;
  }

  h5 {
    width: 70%;
    margin: auto;
    color: lightgray;
    text-align: center;
    padding-bottom: 10px;
  }

  span {
    text-align: center;
    line-height: 0.5rem;
    font-weight: 100;
  }

  h5 span:before, h5 span:after {

    display: inline-block;
    content: '';
    vertical-align: bottom;
    height: .4rem;
    line-height: 0.5rem;
    border-top:1px solid lightgray;
    width: 35%;
  }

  .closeBtn {

    position: absolute;
    right:0px;
    top:0px;
    width: 3rem;
    height: 3rem;
    background-size: 1rem;
    background: no-repeat center url("../assets/close1.png");
  }

  .facilities {

    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    display: flex;
    display: -webkit-flex;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 30px;
    flex-wrap: wrap;
  }

  .facility {

    flex:1;
  }

</style>
