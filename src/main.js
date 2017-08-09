// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import indoorun from '../../indoorunMap/map.js'
import FindCarView from './FindCarView'
import FLoorListView from './floorlistview'
import EmptySpaceView from './emptyspaceview'
import LocateStatusView from './locatestatusview'
import FindFacilityBtnView from './findfacilityview'
import FindFacilityView from './findfacility'
import NormalBottomBar from './normalbottombar'
import NavigateBottomBar from './navigateBottomBar'
import AlertBox from './AlertBox'
import BottomBar from './bottombar'

Vue.config.productionTip = false

var regionId = '14428254382730015'

var idrMapView = indoorun.idrMapView

var map = new idrMapView()

var floorListView = null

var emptySpaceView = null

var locateStatusView = null

var findFacilityBtnView = null

var navigateBottomBar = null

var normalBottomBar = null

var findEmptySpaceInfo = {
  icon:'/static/kongwei.png',
  title:'空位引导',
  type:'0',
  cb:navigateToEmptySpace
}

var findByBleInfo = {
  icon:'/static/biaoji.png',
  title:'蓝牙标记',
  type:'1',
  cb:markWithBluetooth
}

var findCarInfo = {
  icon:'/static/zhaoche.png',
  title:'找车',
  type:'2',
  cb:function() {
    showFindCarView()
  }
}

function showNormalBottomBar(bshow) {
  
  if (!normalBottomBar && bshow) {
    
    normalBottomBar = new NormalBottomBar([findEmptySpaceInfo, findByBleInfo, findCarInfo])
  }
  
  normalBottomBar && normalBottomBar.show(bshow)
}

function showNavigateBottombar(bshow, path, cb) {
  
  if (!navigateBottomBar && bshow) {
    
    navigateBottomBar = new NavigateBottomBar(map)
  }
  
  navigateBottomBar && navigateBottomBar.show(bshow, path, cb)
}

function showFindFacilityBtnView(bshow, cb) {
  
  if (!findFacilityBtnView && bshow) {
  
    findFacilityBtnView = new FindFacilityBtnView(cb)
  }
  
  findFacilityBtnView && findFacilityBtnView.show(bshow)
}

function showLocateStatusView(bshow) {
  
  if (!locateStatusView && bshow) {
  
    locateStatusView = new LocateStatusView(map)
  }
  
  locateStatusView && locateStatusView.show(bshow)
}

function showFloorListView(bshow) {
  
  if (!floorListView && bshow) {
  
    floorListView = new FLoorListView(map)
  }
  
  floorListView && floorListView.show(bshow)
}

function showEmptySpaceView(bshow) {
  
  if (!emptySpaceView && bshow) {
  
    emptySpaceView = new EmptySpaceView(map)
  }
  
  emptySpaceView && emptySpaceView.show(bshow)
}

map.initMap('2b497ada3b2711e4b60500163e0e2e6b', 'map', regionId)

map.addEventListener(map.eventTypes.onFloorChangeSuccess, function(data) {
  
  floorListView.setCurrentFloor(data.floorId)
  
  map.doLocation(function(pos) {
    
    map.setCurrPos(pos)
  })
})

function checkExit() {
  
  showAlertBox(true, '是否结束本次导航', function() {
    
    map.stopRoute()
    
    showAlertBox(false, '', null)
  })
}

var endMarker = null

map.addEventListener(map.eventTypes.onRouterFinish, function() {
  
  showNavigateBottombar(false, null, null)
  
  showSomeUIInNavi(true)
  
  map.removeMarker(endMarker)
})

function addEndMarker(pos) {
  
  var IDREndMarker = indoorun.idrMapMarker.IDREndMarker
  
  var endMarker = new IDREndMarker(pos, '/static/markericon/end.png')
  
  map.addMarker(endMarker)
  
  return endMarker
}

function showSomeUIInNavi(bshow) {
  
  showFloorListView(bshow)
  
  showEmptySpaceView(bshow)
  
  showNormalBottomBar(bshow)
  
  showFindFacilityBtnView(bshow, function() {
  
    showFindFacilityView()
  })
}

map.addEventListener(map.eventTypes.onRouterSuccess, function(data) {
  
  endMarker = addEndMarker(data.end)
  
  showSomeUIInNavi(false)
  
  showBottomBar(false)
  
  showNavigateBottombar(true, data.path, checkExit)
})

map.addEventListener(map.eventTypes.onInitMapSuccess, function(regionEx) {
  
  map.changeFloor(regionEx.floorList[0].id)
  
  showFloorListView(true)
  
  showEmptySpaceView(true)
  
  showLocateStatusView(true)
  
  showFindFacilityBtnView(true, function() {
  
    showFindFacilityView()
  })
  
  showNormalBottomBar(true)
})

var findcarview = null

var tempMarkers = []

function onFindTargetUnits(units) {
  
  tempMarkers.length = 0
  
  if (units.length == 1) {
  
    map.doRoute(map.getUserPos(), units[0].getPos())
    
    return
  }
  
  showEmptySpaceView(false)
  
  showFindFacilityBtnView(false)
  
  showNormalBottomBar(false)
  
  for (var i = 0; i < units.length; ++i) {
  
    var IDRMapMarker = indoorun.idrMapMarker.IDRMapMarker
    
    var marker = new IDRMapMarker(units[i].getPos(), '/static/markericon/temppoint.png')
    
    map.addMarker(marker)
  
    tempMarkers.push(marker)
  }
  
  map.addEventListener('onMarkerClick', function(marker) {
  
    var pos = marker.position
    
    for (var i = 0; i < tempMarkers.length; ++i) {
  
      map.removeMarker(tempMarkers[i])
    }
  
    tempMarkers.length = 0
    
    map.doRoute(map.getUserPos(), pos)
  
    map.removeEventListener('onMarkerClick')
  })
}

function onMarkUnitInMap() {
  
  showEmptySpaceView(false)
  
  showFindFacilityBtnView(false)
  
  showNormalBottomBar(false)
  
  showBottomBar(true)
  
  map.addEventListener('onMapLongPress', function(pos) {
  
    map.doRoute(map.getUserPos(), pos)
  
    map.removeEventListener('onMapLongPress')
  
    showBottomBar(false)
  })
}

function showFindCarView() {
  
  if (!findcarview) {
  
    findcarview = new FindCarView(map, function(units) {
    
      onFindTargetUnits(units)
      
    }, function() {
    
      onMarkUnitInMap()
    })
  }
  
  findcarview.show(0)
}

function navigateToEmptySpace() {

}

function markWithBluetooth() {


}

var findFacilityView = null

function showFindFacilityView() {
  
  if (!findFacilityView) {
   
    findFacilityView = new FindFacilityView(map)
  }
  
  findFacilityView.show()
}

var alertboxdiv = null

function showAlertBox(bshow, message, confirmcb) {

  if (!alertboxdiv && bshow) {
  
    alertboxdiv = new AlertBox()
  }
  
  alertboxdiv && alertboxdiv.show(bshow, message, confirmcb)
}

var bottomBar = null

function showBottomBar(bshow) {
  
  if (!bottomBar && bshow) {
  
    bottomBar = new BottomBar()
  }
  
  bottomBar && bottomBar.show(bshow)
}
