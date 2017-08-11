import Vue from 'vue'
import emptyspace from './components/emptyspace.vue'

function EmptySpaceView(callback) {
  
  var _vm = null
  
  var _callback = callback
  
  function load() {
    
    _vm = new Vue({
      el:'#emptyspace',
      components: { emptyspace },
      methods: {
        onFindEmptySpace:function() {
          
          _callback && _callback(!this.doFind)
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
  
  function doFinding(value) {
    
    _vm.doFind = value
  }
  
  this.show = show
  
  this.doFinding = doFinding
}

export { EmptySpaceView as default }
