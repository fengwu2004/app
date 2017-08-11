import Vue from 'vue'
import errortipview from './components/errortipview.vue'

function ErrorTipView() {
  
  var _vm = null
  
  var _message = ''
  
  function load() {
    
    _vm = new Vue({
      el:'#publicfacility',
      components: { errortipview },
      data:function() {
        return {
          message:_message
        }
      }
    })
  }
  
  function show(message) {
    
    _message = message
    
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

export { ErrorTipView as default }
