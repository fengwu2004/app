<template>
  <div v-on:click="onclick()">
    <img :src="data.icon"/>
    <p> {{ data.title }} </p>
  </div>
</template>

<script>
export default {
  name : 'footBarBtn',
  props:['data'],
  methods: {
    onclick:function() {
      this.$emit('onbtnclick', this.data.type)
      console.log(this.data.title)
    }
  }
}
</script>

<style scoped>

  div {
    flex:1;
    -webkit-flex: 1;
  }

  img {
    width: 35%;
    max-width: 50px;
    margin: 1.5% 0;
    padding: 5px 0 0 0;
  }

  p {
    line-height: 14px;
    font-size: 0.6rem;
    text-align: center;
    padding: 0 0 5px 0;
    margin: 0;
  }

</style>
