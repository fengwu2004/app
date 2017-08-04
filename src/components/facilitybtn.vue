<template>
  <div v-on:click="onclick">
    <img :src="item.icon"/>
    <p> {{ item.title }} </p>
  </div>
</template>

<script>
  export default {
    name : 'facilitybtn',
    props:['item'],
    methods: {
      onclick:function() {
        this.$emit('onclick', this.item.type)
        console.log(this.item.title)
      }
    }
  }
</script>

<style scoped>

  div {
    flex:1;
    -webkit-flex: 1;
    min-width: 33%;
    max-width: 33%;
  }

  img {
    width: 50%;
    left: 0;
    right: 0;
    max-width: 50px;
  }

  p {
    line-height: 14px;
    font-size: 0.6rem;
    text-align: center;
    padding: 5px 0;
    margin: 0;
  }

</style>
