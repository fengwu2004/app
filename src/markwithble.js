import Vue from 'vue'
import markwithble from './components/markwithble.vue'

function MarkWithBleView(map, unit, confirmCallBack) {
  
  var _vm = null
  
  var _map = map
  
  var _unit = unit
  
  var _confirmCallBack = confirmCallBack
  
  function load() {
    
    _vm = new Vue({
      el:'#markwithble',
      components: { markwithble },
      computed: {
        name:function() {
          return _map.regionEx.getFloorbyId(_unit.floorId).name + ' - ' + _unit.name
        }
      },
      methods: {
        onConfirm:function() {
  
          this.$el.style.visibility = 'hidden'
  
          _confirmCallBack && _confirmCallBack(_unit)
        },
        onClose:function() {
         
          this.$el.style.visibility = 'hidden'
        }
      }
    })
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
}

export { MarkWithBleView as default }
