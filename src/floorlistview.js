import Vue from 'vue'
import floorlistdiv from './components/floorList.vue'

function FloorListView(map) {
  
  var _vm = null
  
  var _map = map
  
  function load() {
    
    _vm = new Vue({
      el:"#floorList",
      components: { floorlistdiv },
      data: function() {
        return {
          floorList:_map.regionEx.floorList,
          currentFloorId:_map.getFloorId()
        }
      },
      methods:{
        onSelect:function(val) {
          this.currentFloorId = val
          _map.changeFloor(val)
          _map.autoChangeFloor = false
        }
      }
    })
  }
  
  function setCurrentFloor(floorId) {
    
    console.log(floorId + '+++++++++')
  
    _vm.currentFloorId = floorId
  }
  
  function show(visible) {
  
    if (!_vm) {
    
      if (visible) {
      
        load()
      }
    
      return
    }
  
    if (visible) {
    
      _vm.$el.style.visibility = 'visible'
    }
    else {
    
      _vm.$el.style.visibility = 'hidden'
    }
  }
  
  this.show = show
  
  this.setCurrentFloor = setCurrentFloor
}

export { FloorListView as default }
