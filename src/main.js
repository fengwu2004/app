// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import findcar from './findCar.vue'
import floorlistdiv from './components/floorList.vue'
import indoorun from '../../indoorunMap/map.js'
import emptyspace from './components/emptyspace.vue'
import locatestatediv from './components/locatestatus.vue'
import publicfacilitydiv from './components/publicfacility.vue'
import FindFacilityView from './findfacility'
import NormalBottomBar from './normalbottombar'
import navigatebottombar from './components/navigateBottombar.vue'

Vue.config.productionTip = false

var regionId = '14428254382730015'

var idrMapView = indoorun.idrMapView

var map = new idrMapView()

function addFloorListDiv(map) {
  
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
}

map.initMap('2b497ada3b2711e4b60500163e0e2e6b', 'map', regionId)

map.addEventListener(map.eventTypes.onFloorChangeSuccess, function() {
  
  addFloorListDiv(map)
  
  map.doLocation(function(pos) {
    
    // console.log(pos)
    
    map.setCurrPos(pos)
  })
})

map.addEventListener(map.eventTypes.onInitMapSuccess, function(regionEx) {
  
  map.changeFloor(regionEx.floorList[0].id)
})

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

var normalBottomBar = null

function showNormalBottomBar() {
  
  normalBottomBar = new NormalBottomBar()
  
  normalBottomBar.show(true)
}

showNormalBottomBar()

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
    
      this.dolocate = true
      
      map.centerPos(map.userPos(), true)
    }
  },
  
  data: function() {
    return {
      dolocate:false
    }
  }
})

var findFacilityView = null

function showFindFacilityView() {
  
  if (!findFacilityView) {
   
    findFacilityView = new FindFacilityView(map)
  }
  
  findFacilityView.show()
}

function addFacilityBtn() {
  
  new Vue({
    el:'#publicfacility',
    components: { publicfacilitydiv },
    methods: {
      onclick:function () {
        
        showFindFacilityView()
      }
    },
  })
}

addFacilityBtn()

new Vue({
  el:'#navigate',
  components:{ navigatebottombar },
  data: function() {
    return {
      routerpos:['始', 'B1', 'B2', '终']
    }
  }
})
