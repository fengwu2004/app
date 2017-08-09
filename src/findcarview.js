import Vue from 'vue'
import findwithnum from './components/findWithNum.vue'
import findwithunit from './components/findWithUnit.vue'

const findtype_withnumber = 0
const findtype_withunit = 1

function FindCarView(map, findUnitsCallBack, markUnitInMapCallBack) {
  
  var _vm = null
  
  var _map = map
  
  var _type = 0
  
  var _findUnitsCallBack = findUnitsCallBack
  
  var _markUnitInMapCallBack = markUnitInMapCallBack
  
  function load() {
    
    _vm = new Vue({
      el: '#findCar',
      components: { findwithnum, findwithunit },
      data:function() {
        return {
          map:_map,
          type:_type,
          findbynum:findtype_withnumber,
          findbyunit:findtype_withunit,
        }
      },
      methods: {
        onClose:function(value) {
        
          this.type = value
        },
        onMarkInMap:function() {
  
          _markUnitInMapCallBack && _markUnitInMapCallBack()
        },
        onFindUnits:function(units) {
  
          _findUnitsCallBack && _findUnitsCallBack(units)
        }
      }
    })
  }
  
  function show(type) {
  
    _type = type
  
    if (!_vm) {
      
      load()
    
      return
    }
    
    _vm.type = type
  }
  
  this.show = show
}

export { FindCarView as default }


