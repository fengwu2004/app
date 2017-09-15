<template>
  <div v-on:click="onclick">
    <img :src="getIcon"/>
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
        this.$emit('onclickunitwith', this.facility.type)
        console.log(this.facility.title)
      }
    }
  }
</script>

<style scoped>

  div {
    float: left;
    width: 20%;
    text-align: center;
    padding: ;
  }

  img {
    max-width: 50px;
    width: 90%;
    height: 90%;
  }

</style>
