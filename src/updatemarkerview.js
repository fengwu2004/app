import Vue from 'vue'
import updatemarkerview from './components/updatemarkerview.vue'

function UpdateMarkerView() {
  
  var _vm = null
  
  var _pos = null
  
  function load() {
    
    _vm = new Vue({
      el:'#updatemaker',
      components: { updatemarkerview },
      data:function() {
        return {
          x:(_pos.x - 65).toString() + 'px',
          y:(_pos.y - 100).toString() + 'px'
        }
      },
      methods: {
        deleteMarker:function() {
          
        },
        changeMarkerPos:function() {
          
        },
        share:function() {
          
        }
      }
    })
  }
  
  function show(visible, pos) {
  
    _pos = pos
    
    if (!_vm) {
  
      if (visible) {
        
        load()
      }
      
      return
    }
    
    if (visible) {
      
      _vm.$el.style.visibility = 'visible'
      
      _vm.x = (_pos.x - 65).toString() + 'px',
  
      _vm.y = (_pos.y - 100).toString() + 'px'
    }
    else {
  
      _vm.$el.style.visibility = 'hidden'
    }
  }
  
  this.show = show
}

export { UpdateMarkerView as default }
