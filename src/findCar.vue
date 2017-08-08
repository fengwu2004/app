<template>
  <div>
    <findWithNum v-show="findtype === 0" v-bind:map="map" v-on:onclose="onClose"></findWithNum>
    <findWithUnit v-show="findtype === 1" v-bind:map="map" v-on:onclose="onClose"></findWithUnit>
  </div>
</template>

<script>
  import findwithnum from './components/findWithNum.vue'
  import findWithUnit from './components/findWithUnit.vue'

  export default {
    name: 'findCar',
    components:{findWithNum, findWithUnit},
    props:['type', 'map'],
    data: function() {
      return {
        findtype_:this.type
      }
    },
    computed: {
      findtype:function() {
        return this.type
      }
    },
    methods: {
      onClose:function() {

        this.$emit('ontypechange', 3)
      }
    }
  }

</script>

<style>

</style>
