<template>
  <div>
    <div class="currentName" v-on:click="onShow()">{{ name() }}</div>
    <div v-bind:class="dropDownStyle">
      <div v-for="floor in floorList" v-bind:key="floor.id" v-bind:class="getFloorStyle(floor.id)" v-on:click="onSelect(floor.id)">{{ floor.name }}</div>
    </div>
  </div>
</template>

<script>

  function onShow() {

    this.show = !this.show

    if (this.show) {

      this.dropDownStyle = 'fadein'
    }
    else {

      this.dropDownStyle = 'fadeout'
    }
  }

  function onSelect(floorId) {

    this.$emit('onselect', floorId)

    console.log('选择:' + floorId)

    this.show = false

    if (this.show) {

      this.dropDownStyle = 'fadein'
    }
    else {

      this.dropDownStyle = 'fadeout'
    }
  }

  function getFloorStyle(floorId) {

    if (floorId === this.selectfloorid) {

      return 'dropdown selected'
    }
    else {

      return 'dropdown'
    }
  }

  function getCurrentName() {

    for (var i = 0; i < this.floorList.length; ++i) {

      if (this.floorList[i].id === this.selectfloorid) {

        return this.floorList[i].name
      }
    }

    return null
  }

  console.log('记载')

  export default {
    name :'floorlistdiv',
    props: ['floorlist', 'selectfloorid'],
    data:function() {
      return {
        floorList:this.floorlist,
        selectFloorId:this.selectfloorid,
        show:false,
        dropDownStyle:'fadeout'
      }
    },
    computed:{

    },
    methods:{
      onShow:onShow,
      onSelect:onSelect,
      getFloorStyle:getFloorStyle,
      name:getCurrentName
    }
  }

</script>

<style scoped>

  .fadein {
    visibility: visible;
    opacity: 1;
    transition: opacity 1s linear;
  }

  .fadeout {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 2s, opacity 1s linear;
  }

  .currentName {
    background: url("../assets/lou-01.png") no-repeat;
    background-size: 2.3rem;
    color: #fff;
    text-align: center;
    width: 2.3rem;
    height: 2.3rem;
    line-height: 2.3rem;
    text-align: center;
  }

  .dropdown {
    width: 100%;
    height: 2.3rem;
    line-height: 2.3rem;
    text-align: center;
  }

  .selected{
    background: url("../assets/lcbg.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
    color: #fff;
    line-height: 2.5rem;
    text-align: center;
  }

</style>
