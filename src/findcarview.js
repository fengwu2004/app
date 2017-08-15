import Vue from 'vue'
import findwithnum from './components/findWithNum.vue'
import findwithunit from './components/findWithUnit.vue'

const findtype_withnumber = 0
const findtype_withunit = 1
const findtype_none = 2

function FindCarView(map, findUnitsCallBack, markUnitInMapCallBack, findwithnocallback) {
  
  var _vm = null
  
  var _map = map
  
  var _type = 0
  
  var _findUnitsCallBack = findUnitsCallBack
  
  var _markUnitInMapCallBack = markUnitInMapCallBack
  
  var _findwithnocallback = findwithnocallback
  
  function load() {
    
    _vm = new Vue({
      el: '#findCar',
      components: { findwithnum, findwithunit },
      data:function() {
        return {
          map:_map,
          type:_type,
          showerrorincarno:'hidden',
          showerrorinunit:'hidden',
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
        },
        onFindByCarNo:function(carNo) {
  
          _findwithnocallback && _findwithnocallback(carNo)
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
  
  function hide() {
  
    if (_vm) {
  
      _vm.type = findtype_none
    }
  }
  
  this.showErrorOfFindByCarNo = function() {
    
    if (_vm) {
      
      _vm.showerrorincarno = 'visible'
    }
  }
  
  this.showErrorOfFindByUnit = function() {
    
    if (_vm) {
      
      _vm.showerrorinunit = 'visible'
    }
  }
  
  this.show = show
  
  this.hide = hide
}

export { FindCarView as default }


