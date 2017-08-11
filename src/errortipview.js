import Vue from 'vue'
import errortipview from './components/errortipview.vue'

function ErrorTipView() {
  
  var _vm = null
  
  var _message = ''
  
  function load() {
    
    _vm = new Vue({
      el:'#errortip',
      components: { errortipview },
      data:function() {
        return {
          message:_message,
          display:1
        }
      }
    })
  }
  
  function show(message) {
    
    _message = message
    
    if (!_vm) {
  
      load()
  
      setTimeout(function() {
    
        _vm.display = 0
    
      }, 1000)
      
      return
    }
  
    _vm.display = 1
    
    _vm.message = message
  
    _vm.$el.style.visibility = 'visible'
    
    setTimeout(function() {
    
      _vm.display = 0
      
      setTimeout(function() {
  
        _vm.$el.style.visibility = 'hidden'
        
      }, 1000)
      
    }, 1000)
  }
  
  this.show = show
}

export { ErrorTipView as default }
