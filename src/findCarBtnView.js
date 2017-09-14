import Vue from 'vue'
import findcarbtn from './components/findCarBtn.vue'

function FindCarBtn() {
  
  var _vm = null
  
  function load() {
  
    _vm = new Vue({
      el: "#findcarbtn",
      components: {findcarbtn},
      methods:{
        onFindUnit:function() {
        
        },
        onFindCar:function() {
        
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

export { FindCarBtn as default }
