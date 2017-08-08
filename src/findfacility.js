import Vue from 'vue'
import findfacilityview from './components/findfacilityview.vue'

var futi = {
  type:1,
  title:'电梯',
  icon:'./static/dianti.png'
}

var dianti = {
  
  type:2,
  title:'电梯',
  icon:'./static/dianti.png'
}

var xishoujian = {
  type:3,
  title:'洗手间',
  icon:'./static/cesuo.png'
}

var atm = {
  type:4,
  title:'ATM',
  icon:'./static/ATM.png'
}

var chukou = {
  type:5,
  title:'出口',
  icon:'./static/chukou.png'
}

var rukou = {
  type:7,
  title:'入口',
  icon:'./static/rukou.png'
}

var anquanchukou = {
  type:8,
  title:'安全出口',
  icon:'./static/people.png'
}

var louti = {
  type:9,
  title:'楼梯',
  icon:'./static/louti.png'
}

var xiche = {
  type:10,
  title:'洗车',
  icon:'./static/xiche.png'
}

var shoufeichu = {
  type:11,
  title:'收费处',
  icon:'./static/shoufeichu.png'
}

function getIcons(type) {

  if (type == 1) return futi
  
  if (type == 2) return dianti
  
  if (type == 3) return xishoujian
  
  if (type == 4) return atm
  
  if (type == 5) return chukou
  
  if (type == 7) return rukou
  
  if (type == 8) return anquanchukou
  
  if (type == 9) return louti
  
  if (type == 10) return xiche
  
  if (type == 11) return shoufeichu
}

function FindFacilityView(map) {
  
  var _vm = null
  
  var _facilitys = null
  
  var _icons = []
  
  function getFacilitys() {
  
    _facilitys = map.findUnitsWithType([1, 2, 3, 4, 5, 7, 8, 9, 10, 11])
  
    _icons.length = 0
  
    for (var key in _facilitys) {
    
      _icons.push(getIcons(key))
    }
  }
  
  function onNavigateTo(unitType) {
    
    if (!(unitType in _facilitys)) {
  
      return
    }
  
    var units = _facilitys[unitType]
  
    if (units.length == 0) {
      
      return
    }
    
    var unit = units[0]
    
    map.doRoute(map.getUserPos(), unit.getPos())
  }
  
  function show() {
  
    getFacilitys()
  
    if (!_vm) {
      
      _vm = new Vue({
        el:'#findfacility',
        components: { findfacilityview },
        data: function() {
          return {
            facilitys:_icons,
          }
        },
        methods:{
          onNavigateTo:onNavigateTo
        }
      })
    }
    else {
    
      _vm.$el.style.visibility = 'visible'
    }
  }
  
  this.show = show
}

export { FindFacilityView as default }
