import Vue from 'vue'
import locatestatediv from './components/locatestatus.vue'

function LocateStatusView(map) {
  
  var _vm = null
  
  var _map = map
  
  function load() {
    
    _vm = new Vue({
      el:'#locateState',
      components: { locatestatediv },
      methods: {
        doLocating:function doLocating() {
          this.dolocate = true
          _map.centerPos(_map.getUserPos(), true)
          _map.autoChangeFloor = true
        }
      },
      data: function() {
        return {
          dolocate:false
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

export { LocateStatusView as default }
