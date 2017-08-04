<template>
  <div v-bind:class="getStyle" v-on:click="onClick">
  </div>
</template>

<script>
  export default {
    name: 'locatestatediv',
    props: ['dolocate'],
    computed: {
      getStyle: function() {
        if (this.dolocate) {
          return 'inLocating'
        }
        return 'notLocating'
      }
    },
    methods: {
      onClick: function() {
        this.$emit('onclick', !this.dolocate)
      }
    }
  }
</script>

<style scoped>

  .notLocating {
    background: url("../assets/location1.png") no-repeat;
    background-size: 2.5rem;
    width: 100%;
    height: 100%;
  }

  .inLocating {
    background: url("../assets/location2.png") no-repeat;
    background-size: 2.5rem;
    width: 100%;
    height: 100%;
  }

</style>
