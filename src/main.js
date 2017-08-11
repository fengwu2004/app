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
import MarkWithBleView from './markwithble'
import UpdateMarkerView from './updatemarkerview'
import ErrorTipView from './errortipview'

var config = require('../config')

Vue.config.productionTip = false

var regionId = '14980981254061534'

indoorun.idrNetworkInstance.host = 'http://wx.indoorun.com/'

var idrMapView = indoorun.idrMapView

var map = new idrMapView()

var floorListView = null

var emptySpaceView = null

var locateStatusView = null

var findFacilityBtnView = null

var navigateBottomBar = null

var normalBottomBar = null

var markWithBleView = null

var updateMarkerView = null

var emptySpaceTimer = null

var emptyUnits = []

var targetUnit = null

var startEmptyNavi = false

function onSavePackingUnit(unit) {
  
  var pos = unit.getPos()
  
  var url = '/saveCheLocation.html'
  
  var data = {
    unitId: unit.id,
    floorId: unit.floorId,
    regionId: map.getRegionId(),
    svgX: pos.x,
    svgY: pos.y
  }
  
  indoorun.idrNetworkInstance.doAjax(url, {sName:data}, function() {
  
    console.log('保存成功')
    
  }, function() {
  
    console.log('保存失败')
  })
}

function showMarkWithBle(unit) {
  
  if (!markWithBleView) {
  
    markWithBleView = new MarkWithBleView(map, unit, function(parkingUnit) {
    
      onSavePackingUnit(parkingUnit)
      
      endMarker = addEndMarker(parkingUnit.getPos())
      
      map.addEventListener(map.eventTypes.onMarkerClick, function(marker) {
        
        if (marker !== endMarker) {
        
          return
        }
        
        map.centerPos(marker.position, false)
        
        showUpdateMarkerView(true, marker)
        
        map.addEventListener(map.eventTypes.onMapScroll, function() {
          
          showUpdateMarkerView(false, null)
          
          map.removeEventListener(map.eventTypes.onMapScroll)
        })
      })
    })
  }
  
  markWithBleView.show(true)
}

var findEmptySpaceInfo = {
  icon:config.publicPath + '/static/kongwei.png',
  title:'空位引导',
  type:'0',
  cb:navigateToEmptySpace
}

var findByBleInfo = {
  icon:config.publicPath + '/static/biaoji.png',
  title:'蓝牙标记',
  type:'1',
  cb:function() {
    markWithBluetooth()
  }
}

var findCarInfo = {
  icon:config.publicPath + '/static/zhaoche.png',
  title:'找车',
  type:'2',
  cb:function() {
    onFindCar()
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

function checkTargetValid(unitId, unitList) {
  
  for (var i = 0; i < unitList.length; ++i) {
  
    if (unitList[i].id === unitId) {
      
      return true
    }
  }
  
  return false
}

function checkNeedUpdateNaivtarget(unitlist) {

  if (!startEmptyNavi) {
    
    return
  }
  
  if (!targetUnit || !checkTargetValid(targetUnit.id, unitlist)) {
  
    targetUnit = map.findNearUnit(map.getUserPos(), unitlist)
    
    map.doRoute(map.getUserPos(), targetUnit.getPos())
  
    endMarker && map.removeMarker(endMarker)
  
    endMarker = addEndMarker(targetUnit.getPos())
  }
}

function doFindEmptySpace() {

  var data = {regionId:map.getRegionId(), floorId:map.getFloorId()}
  
  var url = indoorun.idrNetworkInstance.host + 'chene/getSpaceUnitListOfFloor.html'
  
  indoorun.idrNetworkInstance.doAjax(url, data, function(res) {
    
    emptyUnits.length = 0
    
    var spaceUnitList = res.data
    
    for (var i = 0; i < spaceUnitList.length; ++i) {
  
      var unit = new indoorun.idrUnit(spaceUnitList[i])
  
      emptyUnits.push(unit)
    }
    
    map.updateUnitsColor(emptyUnits, 0x8aef99)
    
    checkNeedUpdateNaivtarget(emptyUnits)
    
  }, function() {
  
  
  })
}

function showEmptySpaceView(bshow) {
  
  if (!emptySpaceView && bshow) {
  
    emptySpaceView = new EmptySpaceView(function(finding) {
  
      if (finding) {
  
        doFindEmptySpace()
  
        emptySpaceTimer = setInterval(doFindEmptySpace, 10000)
  
        emptySpaceView.doFinding(true)
      }
      else {
  
        clearInterval(emptySpaceTimer)
  
        emptySpaceTimer = null
  
        emptySpaceView.doFinding(false)
        
        map.clearFloorUnitsColor(true)
  
        emptyUnits.length = 0
      }
    })
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
  
  endMarker = null
  
  if (startEmptyNavi) {
  
    startEmptyNavi = false
  
    clearInterval(emptySpaceTimer)
  
    emptySpaceTimer = null
  
    emptySpaceView.doFinding(false)
  
    map.clearFloorUnitsColor(true)
  
    emptyUnits.length = 0
  }
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
  
  if (!endMarker) {
  
    endMarker = addEndMarker(data.end)
  }
  
  showSomeUIInNavi(false)
  
  showBottomBar(false)
  
  showNavigateBottombar(true, data.path, checkExit)
  
  map.birdLook()
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
  
  document.title = regionEx.name
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
  
  showBottomBar(true, '长按车位进行选择')
  
  map.addEventListener('onMapLongPress', function(pos) {
  
    map.doRoute(map.getUserPos(), pos)
  
    map.removeEventListener('onMapLongPress')
  
    showBottomBar(false, '')
  })
}

function onFindCar() {

  if (endMarker) {
  
    map.doRoute(map.getUserPos(), endMarker.position)
  }
  else {
    
    showFindCarView()
  }
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
  
  if (map.getUserPos() == null) {
  
    return
  }
  
  startEmptyNavi = true

  if (!emptySpaceTimer) {
  
    doFindEmptySpace()
  
    emptySpaceTimer = setInterval(doFindEmptySpace, 10000)
  
    emptySpaceView.doFinding(true)
  }
}

function markWithBluetooth() {

  var pos = map.getUserPos()
  
  if (!pos) {
  
    return
  }
  
  showMarkWithBle(map.getNearUnit(pos))
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

function showBottomBar(bshow, message) {
  
  if (!bottomBar && bshow) {
  
    bottomBar = new BottomBar()
  }
  
  bottomBar && bottomBar.show(bshow, message)
}

function updateMarkerPos() {
  
  showBottomBar(true, '点击车位进行选择')
  
  showNormalBottomBar(false)
  
  map.addEventListener(map.eventTypes.onUnitClick, function(unit) {
  
    map.updateMarkerLocation(endMarker, unit.getPos())
  
    showBottomBar(false, '')
    
    showNormalBottomBar(true)
    
    map.removeEventListener(map.eventTypes.onUnitClick)
  })
}

function deleteMarker() {
  
  map.removeEventListener(map.eventTypes.onMarkerClick)

  map.removeMarker(endMarker)
  
  endMarker = null
}

function sharePosition() {
  
  var ua = navigator.userAgent;
  
  if(ua.match(/iPhone|iPod/i) != null){
    
    setTimeout("javascript:location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.yellfun.yellfunchene'", 0);
    
  } else if (ua.match(/Android/i) != null){
    
    window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yellfun.yellfunchene";
  }
}

function showUpdateMarkerView(show, marker) {

  if (!updateMarkerView && show) {
  
    updateMarkerView = new UpdateMarkerView(deleteMarker, updateMarkerPos, sharePosition)
  }
  
  updateMarkerView && updateMarkerView.show(show, marker, map)
}
