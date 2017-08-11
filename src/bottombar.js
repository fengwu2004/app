import Vue from 'vue'
import bottombar from './components/bottombar.vue'

function BottomBar() {
  
  var _vm = null
  
  function load() {
    
    _vm = new Vue({
      el:'#bottombar',
      components:{ bottombar },
      data: function() {
        return {
          message:''
        }
      }
    })
  }
  
  function show(bShow, message) {
    
    if (!_vm) {
      
      if (!bShow) {
        
        return
      }
  
      load()
      
      _vm.message = message
      
      return
    }
    
    if (bShow) {
    
      _vm.$el.style.visibility = 'visible'
  
      _vm.message = message
    }
    else {
  
      _vm.$el.style.visibility = 'hidden'
    }
  }
  
  this.show = show
}

export { BottomBar as default }
