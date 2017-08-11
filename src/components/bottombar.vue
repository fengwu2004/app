<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'bottombar',
  props:['message']
}
</script>

<style scoped>

  div {
    background-color: #0b79f2;
    width: 100%;
    height: 1.6rem;
    padding: 0.7rem 0;
    text-align: center;
  }

  p {
    color: white;
    line-height: 1.6rem;
    height: 1.6rem;
    margin: 0;
  }

</style>
