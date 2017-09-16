<template>
  <div class="main" v-on:click="click">
    <label>取消标记</label>
    <div class="bg" v-on:click="clickbg"></div>
  </div>
</template>

<script>
export default {
  name: 'cancelmark',
  methods: {
    click:function() {
      this.$emit('click')
    },
    clickbg:function() {
      this.$emit('clickbg')
    }
  }
}
</script>

<style scoped>

  .main {

    width: 60%;
    margin: auto;
    text-align: center;
    left: 0;right: 0;
    border-radius: 30px;
    position: absolute;
    height: 40px;
    bottom: 50px;
    color: white;
    background-color: #ff4343;
  }

  .bg {

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
  }

  label {
    line-height: 40px;
  }

</style>
