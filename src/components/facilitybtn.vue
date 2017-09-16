<template>
  <div class="main" v-on:click="onclick">
    <div class="center">
      <img :src="getIcon"/>
    </div>
  </div>
</template>

<script>

  export default {
    name : 'facilitybtn',
    props:['facility'],
    computed:{
      getIcon:function() {

        return this.facility.icon
      }
    },
    methods: {
      onclick:function() {

        this.$emit('click', this.facility)
      }
    }
  }
</script>

<style scoped>

  .main {

    width: 53px;
    height: 53px;
    margin: 5px;
  }

  .center {

    width: 95%;
    height: 95%;
    margin: 2.5%;
  }

  img {
    width: 100%;
    height: 100%;
  }

</style>
