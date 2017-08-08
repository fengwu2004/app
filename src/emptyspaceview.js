import Vue from 'vue'
import emptyspace from './components/emptyspace.vue'

function EmptySpaceView(map) {
  
  var _vm = null
  
  var _map = map
  
  function load() {
    
    _vm = new Vue({
      el:'#emptyspace',
      components: { emptyspace },
      methods: {
        onFindEmptySpace:function onFindEmptySpace(value) {
      
      
        }
      },
      data: function() {
        return {
          doFind:false
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

export { EmptySpaceView as default }
