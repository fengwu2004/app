import Vue from 'vue'
import bottombar from './components/bottombar.vue'

function BottomBar() {
  
  var _vm = null
  
  function load() {
    
    _vm = new Vue({
      el:'#bottombar',
      components:{ bottombar },
    })
  }
  
  function show(bShow) {
    
    if (!_vm) {
      
      if (!bShow) {
        
        return
      }
  
      load()
      
      return
    }
    
    if (bShow) {
    
      _vm.$el.style.visibility = 'visible'
    }
    else {
  
      _vm.$el.style.visibility = 'hidden'
    }
  }
  
  this.show = show
}

export { BottomBar as default }
