<template>
  <div>
    <findWithNum v-show="type === 0" v-bind:map="map"></findWithNum>
    <findWithUnit v-show="type === 1" v-bind:map="map"></findWithUnit>
  </div>
</template>

<script>
  import findWithNum from './components/findWithNum.vue'
  import findWithUnit from './components/findWithUnit.vue'

  export default {
    name: 'findCar',
    components:{findWithNum, findWithUnit},
    props:['type', 'map'],
  }

</script>

<style>

</style>
