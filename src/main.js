// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import findcar from './findCar.vue'
import footbarbtn from './components/footBarBtn.vue'
import floorlistdiv from './components/floorList.vue'
import indoorun from '../../indoorunMap/map.js'
import emptyspace from './components/emptyspace.vue'
import locatestatediv from './components/locatestatus.vue'
import publicfacilitydiv from './components/publicfacility.vue'
import findfacilityview from './components/findfacilityview.vue'

Vue.config.productionTip = false

var regionId = '14428254382730015'

var idrMapView = indoorun.idrMapView

var map = new idrMapView()

map.initMap('2b497ada3b2711e4b60500163e0e2e6b', 'map', regionId)

map.addEventListener(map.eventTypes.onFloorChangeSuccess, function(data) {
  
  new Vue({
    el:"#floorList",
    components: { floorlistdiv },
    data: function() {
      return {
        floorList:map.regionEx.floorList,
        currentFloorId:map.getFloorId()
      }
    },
    methods:{
      onSelect:function(val) {
        this.currentFloorId = val
        map.changeFloor(val)
      }
    }
  })
})

map.addEventListener(map.eventTypes.onInitMapSuccess, function(regionEx) {
  
  map.changeFloor(regionEx.floorList[0].id)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { findcar },
  data:function() {
    return {
      findCarType:3,
      map:map
    }
  }
})

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

new Vue({
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

new Vue({
  el:'#emptyspace',
  components: { emptyspace },
  methods: {
    onFindEmptySpace:function onFindEmptySpace(value) {
    
    
    }
  },
  data: function() {
    return {
      doFind:false
    }
  }
})

new Vue({
  el:'#locateState',
  components: { locatestatediv },
  methods: {
    doLocating:function doLocating() {
    
      this.dolocate = !this.dolocate
    }
  },
  data: function() {
    return {
      dolocate:false
    }
  }
})

var dianti = {
  type:1,
  title:'电梯',
  icon:'./static/dianti.png'
}

var louti = {
  type:2,
  title:'楼梯',
  icon:'./static/louti.png'
}

var shoufeichu = {
  type:3,
  title:'收费处',
  icon:'./static/shoufeichu.png'
}

var facilitys = [dianti, louti, shoufeichu, dianti, dianti, dianti]

var findfacilityVm = null

function showFindFacilityView() {
  
  if (!findfacilityVm) {
    
    findfacilityVm = new Vue({
      el:'#findfacility',
      components: { findfacilityview },
      data: function() {
        return {
          facilitys:facilitys,
        }
      }
    })
  }
  else {
    
    var div = findfacilityVm.$el.getElementsByClassName('main')[0]
  
    div.style.visibility = 'visible'
  }
}

new Vue({
  el:'#publicfacility',
  components: { publicfacilitydiv },
  methods: {
    onclick:function () {
      
      showFindFacilityView()
    }
  },
})

