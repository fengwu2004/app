import Vue from 'vue'
import alertbox from './components/alertbox.vue'

function AlertBox() {
  
  var _vm = null
  
  var _cb = null
  
  var _message = ''
  
  function load() {
  
    _vm = new Vue({
      el: '#alertbox',
      components: { alertbox },
      computed: {
        message:function() {
          return _message
        }
      },
      methods: {
        confirm:function() {
          
          _cb && _cb()
        },
        cancel:function() {
  
          this.$el.style.visibility = 'hidden'
        }
      }
    })
  }
  
  function show(bshow, message, cb) {
    
    _cb = cb
    
    _message = message
  
    if (!_vm) {
    
      if (!bshow) return
      
      load()
      
      return
    }
    
    if (bshow) {
  
      _vm.$el.style.visibility = 'visible'
    }
    else {
  
      _vm.$el.style.visibility = 'hidden'
    }
  }
  
  this.show = show
}

export { AlertBox as default }
