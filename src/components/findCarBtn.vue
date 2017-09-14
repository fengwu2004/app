<template>
  <div>
    <div class="bigbtn" v-on:click="onFindClick"></div>
    <div v-if="show" class="container">
      <div class="btn" v-on:click="findUnit">标记车位</div>
      <div class="btn" v-on:click="findCar">反向找车</div>
    </div>
  </div>
</template>

<script>

  export default {

    name:'findcarbtn',
    data: function() {
      return {
        show:false,
      }
    },
    methods:{
      onFindClick:function() {

        this.show = !this.show
      },
      findUnit:function() {

        this.$emit('onfindunit')

        this.show = false
      },
      findCar:function() {

        this.$emit('onfindcar')

        this.show = false
      }
    }
  }

</script>

<style scoped>

  .bigbtn {

    background: url("../assets/tmp1.png") no-repeat;
    background-size: 5rem;
    display: inline-block;
    height: 5rem;
    width: 5rem;
    vertical-align: middle;
    position: relative;
    z-index: 2;
  }

  .btn {

    display: inline-block;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 3px 3px;
    margin: 3px 3px;
    background-color: #0b79f2;
  }

  .container {

    vertical-align: middle;
    border: 3px #0b79f2 solid;
    border-radius: 3px;
    padding-left: 30px;
    display: inline-block;
    position: relative;
    left: -35px;
    z-index: 1;
  }

</style>
