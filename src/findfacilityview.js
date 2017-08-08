import Vue from 'vue'
import publicfacilitydiv from './components/publicfacility.vue'

function FindFacilityView(cb) {
  
  var _vm = null
  
  var _cb = cb
  
  function load() {
    
    _vm = new Vue({
      el:'#publicfacility',
      components: { publicfacilitydiv },
      methods: {
        onclick:function () {
      
          _cb && _cb()
        }
      },
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

export { FindFacilityView as default }
