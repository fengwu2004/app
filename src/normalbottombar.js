import Vue from 'vue'
import footbarbtn from './components/footBarBtn.vue'

var findEmptySpaceInfo = {
  icon:'./static/kongwei.png',
  title:'空位引导',
  type:'0'
}

var findByBleInfo = {
  icon:'./static/biaoji.png',
  title:'蓝牙标记',
  type:'1'
}

var findCarInfo = {
  icon:'./static/zhaoche.png',
  title:'找车',
  type:'2'
}

function NormalBottomBar() {
  
  var _vm = null
  
  function load() {
    
    _vm = new Vue({
      el:'#footer',
      components: { footbarbtn },
      data: function() {
        return {
          btnInfos: [findEmptySpaceInfo, findByBleInfo, findCarInfo],
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
