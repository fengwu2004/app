<template>
  <div v-bind:class="getStyle" v-on:click="onClick">
  </div>
</template>

<script>
export default {
  name: 'emptyspace',
  props:['dofind'],
  computed: {
    getStyle:function() {
      if (this.dofind) {
        return 'inFind'
      }
      return 'notFind'
    }
  },
  methods: {
    onClick:function() {

      this.$emit('onclick', '')
    }
  }
}
</script>

<style scoped>

  .notFind {
    background: url("../assets/vacancy1.png") no-repeat;
    background-size: 2.5rem;
    width: 100%;
    height: 100%;
  }

  .inFind {
    background: url("../assets/vacancy2.png") no-repeat;
    background-size: 2.5rem;
    width: 100%;
    height: 100%;
  }

</style>
