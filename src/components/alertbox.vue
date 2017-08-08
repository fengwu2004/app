<template>
  <div>
    <div class="bg"></div>
    <div class="content">
      <p>{{ message }}</p>
      <div class="btn">
        <div class="cancal" v-on:click="onCancel">{{ cancel }}</div>
        <div class="confirm" v-on:click="onConfirm">{{ confirm }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alertbox',
    props: ['message'],
    data:function() {
      return {
        cancel:'取消',
        confirm:'结束'
      }
    },
    methods:{
      onConfirm:function() {
        this.$emit('onconfirm', '')
      },
      onCancel:function() {
        this.$emit('oncancel', '')
      }
    }
  }

</script>

<style scoped>
  .bg {
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 0;
    background-color: #9D9D9D;
    opacity: 0.4;
    z-index: 2;
  }

  .content {
    border-radius: 5px;
    background-color: white;
    position: absolute;
    left:0;
    right:0;
    width: 80%;
    top: 40%;
    margin:auto;
    z-index: 2;
  }

  .content p {
    text-align: center;
    line-height: 2rem;
  }

  .cancal {

    float: left;
  }

  .confirm {
    float: right;
    border-left: 1px solid #a7a49d;
    box-sizing: border-box;
  }

  .btn {
    width: 100%;
    border-top:1px solid #a7a49d;
  }

  .btn div{
    width: 50%;
    height: 3rem;
    color:#0188fe;
    text-align: center;
    line-height: 3rem;
  }

</style>
