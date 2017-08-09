import Vue from 'vue'
import markwithble from './components/markwithble.vue'

function MarkWithBleView(unit) {
  
  var _vm = null
  
  var _unit = unit
  
  function load() {
    
    _vm = new Vue({
      el:'#markwithble',
      components: { markwithble },
      data: function() {
        return {
          unit:_unit
        }
      },
      methods: {
        onConfirm:function() {
  
          this.$el.style.visibility = 'hidden'
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
