import Vue from 'vue'
import normalbottombar from './components/normalBottombar.vue'

function NormalBottomBar(btninfos) {
  
  var _vm = null
  
  function load() {
    
    _vm = new Vue({
      el:'#footer',
      components: { normalbottombar },
      data: function() {
        return {
          btnInfos: btninfos,
        }
      },
      methods:{
        onReceive:function(msg) {
        
          console.log(msg)
        },
        onFindByUnit:function() {
        
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

export { NormalBottomBar as default }
