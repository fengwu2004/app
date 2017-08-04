<template>
  <div v-on:click="onClick">
  </div>
</template>

<script>
export default {
  name: 'publicfacilitydiv',
  methods: {
    onClick:function() {
      this.$emit('onclick', 1)
    }
  }
}
</script>

<style scoped>

  div {
    background: url("../assets/public_fac1.png") no-repeat;
    background-size: 2.5rem;
    width: 100%;
    height: 100%;
  }

</style>
