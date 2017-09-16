// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import indoorun from '../../indoorunMap/map.js'
import FLoorListView from './floorlistview'
import LocateStatusView from './locatestatusview'
import FindFacilityView from './findfacility'
import NavigateBottomBar from './navigateBottomBar'
import AlertBox from './AlertBox'
import BottomBar from './bottombar'
import ErrorTipView from './errortipview'
import ZoomView from './zoomview'
import findwithnum from './components/findWithNum.vue'
import findwithunit from './components/findWithUnit.vue'
import unitdetail from './components/unitdetail.vue'
import navigatestop from './components/navigatestop.vue'
import cancelmark from './components/cancelmark.vue'

var config = require('../config')

Vue.config.productionTip = false

var regionId = '14980981254061534'

var idrMapView = indoorun.idrMapView

var map = new idrMapView()

map.publicPath = config.publicPath

var floorListView = null

var locateStatusView = null

var findFacilityBtnView = null

var errortipview = new ErrorTipView()

var alertboxview = null

var zoomView = null

var _carMarker = null
var _carPos = null
var _startPos = null
var _endMarker = null
var _endPos = null
var _startMarker = null

// indoorun.idrDebug.showDebugInfo(true)

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

function showLocateStatusView(bshow) {
  
  return
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

var gmtime = new Date().getTime()

map.initMap('2b497ada3b2711e4b60500163e0e2e6b', 'map', regionId)

var getSaveUnit = true

map.addEventListener(map.eventTypes.onFloorChangeSuccess, function(data) {
  
  floorListView.setCurrentFloor(data.floorId)
  
  if (!getSaveUnit) {
    
    indoorun.idrNetworkInstance.getMarkedUnit(map.getRegionId(), function(res) {
      
      if (res.code === 'success') {
        
        _carPos = {x:res.data.svgX, y:res.data.svgY, floorId:res.data.floorId}
        
        _carMarker = addCarMarker(_carPos)
      }
    }, null)
    
    getSaveUnit = true
  }
  
  // indoorun.idrDebug.showDebugInfo(true)
  
  showSearchUnitView()
  
  indoorun.idrDebug.debugInfo('加载时间:' + (new Date().getTime() - gmtime).toString())
  
  map.doLocation(function(pos) {
    
    map.setCurrPos(pos)
    
  }, function(errorId) {
    
    if (errorId === 0) {
      
      var confirm = {name:'确定', callback:function() {
        
        alertboxview.hide()
      }}
      
      showAlertBox('手机蓝牙未开启', '您可以尝试从手机设置中开启蓝牙设备', [confirm])
    }
  })
})

map.addEventListener(map.eventTypes.onNaviStatusUpdate, function(status) {
  
  if (!status.validate) {
    
    return
  }
  
  if (status.goalDist < 150) {
    
    var cancel = {name:'取消', callback:function() {
      
      alertboxview.hide()
    }}
    
    var confirm = {name:'确定', callback:function() {
      
      alertboxview.hide()
      
      map.stopRoute()
    }}
    
    showAlertBox('您已到达目的地', '是否结束本次导航', [cancel, confirm])
  }
})

function checkExit() {
  
  var cancel = {name:'取消', callback:function() {
    
    alertboxview.hide()
  }}
  
  var confirm = {name:'结束', callback:function() {
    
    map.stopRoute()
    
    alertboxview.hide()
  }}
  
  showAlertBox('是否结束本次导航', null, [cancel, confirm])
}

map.addEventListener(map.eventTypes.onRouterFinish, function() {
  
  showSomeUIInNavi(true)
  
  map.removeMarker(_endMarker)
  
  _endMarker = null
  
  map.removeMarker(_startMarker)
  
  _startMarker = null
})

function addCarMarker(pos) {
  
  var marker = new indoorun.idrMapMarker.IDRCarMarker(pos, config.publicPath + '/static/markericon/车位标记点.png')
  
  map.addMarker(marker)
  
  return marker
}

function showSomeUIInNavi(bshow) {
  
  showFloorListView(bshow)
  
  _findCarBtnView.show = bshow
}

map.addEventListener(map.eventTypes.onRouterSuccess, function(data) {
  
  if (!_endMarker) {
    
    _endMarker = addEndMarker(data.end)
  }
  
  showSomeUIInNavi(false)
  
  showBottomBar(false)
  
  map.birdLook()
})

map.addEventListener(map.eventTypes.onInitMapSuccess, function(regionEx) {
  
  showFloorListView(true)
  
  showLocateStatusView(true)
  
  showFindCarBtn()
  
  document.title = regionEx.name
  
  zoomView = new ZoomView(map)
  
  zoomView.show()
  
  map.changeFloor(regionEx.floorList[0].id)
})

map.addEventListener(map.eventTypes.onUnitClick, (unit)=>{

  console.log(JSON.stringify(unit))
  
  selectUnit(unit)
})

var tempMarkers = []

function onFindTargetUnits(units) {
  
  tempMarkers.length = 0
  
  _startPos = map.getUserPos()
  
  if (_startPos && units.length == 1) {
    
    map.doRoute(_startPos, units[0].getPos())
    
    return
  }
  
  showFindFacilityBtnView(false)
  
  for (var i = 0; i < units.length; ++i) {
    
    var IDRMapMarker = indoorun.idrMapMarker.IDRMapMarker
    
    var marker = new IDRMapMarker(units[i].getPos(), config.publicPath + '/static/markericon/temppoint.png')
    
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

function onMarkUnitInMap(cb) {
  
  showBottomBar(true, '长按车位进行选择')
  
  map.removeEventListener(map.eventTypes.onUnitClick)
  
  map.addEventListener(map.eventTypes.onMapLongPress, function(pos) {
    
    var unit = map.getNearUnit(pos)
    
    indoorun.idrNetworkInstance.saveMarkedUnit(unit, map.getRegionId(), null, null)
    
    map.removeEventListener(map.eventTypes.onMapLongPress)
  
    map.addEventListener(map.eventTypes.onUnitClick, (unit)=>{
    
      console.log(JSON.stringify(unit))
    
      selectUnit(unit)
    })
    
    showBottomBar(false, '')
  
    cb && cb(unit.getPos())
  })
}

function promiseOfFindCarPos() {
  
  if (_carPos) {
    
    return Promise.resolve(_carPos)
  }
  
  return new Promise((resolve) => {
    
    showMarkCarView(resolve)
  })
}

function promiseOfFindStartPos() {
  
  if (_startPos) {
    
    return Promise.resolve(_startPos)
  }
  
  return new Promise((presolve) => {
    
    new Promise((resolve)=>{
  
      showFindCarWithUnit('当前所在位置', map.getFloorId(), resolve)
    })
      .then((res)=>{
        
        if (res !== false) {
        
          return res
        }
  
        return new Promise((resolve)=>{
    
          onMarkUnitInMap(resolve)
        })
      })
      .then((pos)=>{
        
        presolve && presolve(pos)
      })
  })
}

function onFindCar() {
  
  promiseOfFindCarPos()
    
    .then((pos)=>{
      
      _carPos = pos
      
      _carMarker = addCarMarker(_carPos)
      
      return promiseOfFindStartPos()
      
    }).then((pos)=>{
    
    _startPos = pos
  
    _startMarker = addStartMaker(_startPos)
    
    return promiseOfRoute(_startPos, _carPos)
  })
    .then((routersuccess)=>{
    
      if (routersuccess) {
      
        return new Promise((resolve)=>{
          
          showStopNavigate(resolve)
        })
      }
      
      return Promise.reject()
    })
    .then(()=>{
    
      resetStartEndPos()
    })
    .catch(()=>{
    
    })
}

function promiseOfFindCarByUnit(floorId, unitName) {
  
  return new Promise((resolve, reject)=>{
    
    var units = map.findUnitWithName(floorId, unitName)
    
    if (!units) {
      
      reject()
    }
    else {
      
      resolve(units)
    }
  })
}

function promiseOfFindCarByNum(carNum) {
  
  return new Promise((resolve, reject) => {
    
    indoorun.idrNetworkInstance.getParkingPlaceUnitByCarNo(carNum, map.getRegionId(), function(res) {
      
      console.log(JSON.stringify(res))
      
      var data = res.data
      
      var unit = new indoorun.idrUnit(data.parkingUnit)
      
      resolve(unit)
      
    }, function() {
      
      reject(false)
    })
  })
}

//---------------
var _findcarwithnum = null
var _findcarwithunit = null

function showFindCarWithNum(resolve) {
  
  if (_findcarwithnum) {
    
    _findcarwithnum.show = true
    
    _findcarwithnum.resolve = resolve
    
    return
  }
  
  _findcarwithnum = new Vue({
    el:'#findwithnum',
    components: { findwithnum },
    data:function() {
      return {
        errorshow:'hidden',
        resolve:resolve,
        show:true
      }
    },
    methods:{
      
      onConfirm:function(carNum) {
        
        promiseOfFindCarByNum(carNum)
          .catch(() => {
            
            this.errorshow = 'visible'
          })
          .then((unit) => {
            
            this.onClose()
            
            this.resolve(unit.getPos())
          })
      },
      onCancel:function() {
        
        this.onClose()
        
        this.resolve(false)
      },
      onClose: function() {
        
        this.show = false
      }
    }
  })
}

function showFindCarWithUnit(title, currentFloorId, resolve) {
  
  if (_findcarwithunit) {
    
    _findcarwithunit.show = true
    
    _findcarwithunit.resolve = resolve
    
    return
  }
  
  _findcarwithunit = new Vue({
    el:'#findwithunit',
    components: { findwithunit },
    data:function() {
      return {
        errorshow:'hidden',
        currentFloorId:currentFloorId,
        resolve:resolve,
        floorlist:map.regionEx.floorList,
        show:true,
        title:title
      }
    },
    methods:{
      onSelectFloor:function(floorId) {
        
        map.autoChangeFloor = false
        
        map.changeFloor(floorId)
      },
      onConfirm:function(unitName) {
        
        promiseOfFindCarByUnit(map.getFloorId(), unitName)
          .catch(() => {
            
            this.errorshow = 'visible'
          })
          .then((units) => {
            
            this.onClose()
            
            this.resolve(units[0].getPos())
          })
      },
      onCancel:function() {
        
        this.onClose()
        
        this.resolve(false)
      },
      onClose: function() {
        
        this.show = false
      },
    }
  })
}

function showMarkCarView(cb) {
  
  new Promise((resolve, reject)=>{
    
    showFindCarWithNum(resolve, reject)
  })
    .then((res) => {
      
      if (res !== false) {
        
        return Promise.resolve(res)
      }
      
      return new Promise((resolve)=>{
        
        showFindCarWithUnit('车位标记', map.getFloorId(), resolve)
      })
    })
    .then((res)=>{
      
      if (res !== false) {
  
        return Promise.resolve(res)
      }
      
      return new Promise((resolve)=>{
        
        onMarkUnitInMap(resolve)
      })
    })
    .then((pos)=>{
    
      map.centerPos(pos, true)
    
      cb && cb(pos)
    })
    .catch(() => {
      
      console.log('+++++++++++++++')
    })
}

var findFacilityView = null

function showFindFacilityView() {
  
  if (!findFacilityView) {
    
    findFacilityView = new FindFacilityView(map)
  }
  
  findFacilityView.show()
}

function showAlertBox(title, message, buttons) {
  
  if (!alertboxview) {
    
    alertboxview = new AlertBox()
  }
  
  alertboxview.show(title, message, buttons)
}

var bottomBar = null

function showBottomBar(bshow, message) {
  
  if (!bottomBar && bshow) {
    
    bottomBar = new BottomBar()
  }
  
  bottomBar && bottomBar.show(bshow, message)
}

import findcarbtn from './components/findCarBtn.vue'
var _findCarBtnView = null
function showFindCarBtn() {
  
  _findCarBtnView = new Vue({
    el: "#findcarbtn",
    components: { findcarbtn },
    data:()=>{
      return {
        show:true
      }
    },
    methods:{
      onMarkUnit:function() {
  
        showMarkCarView(function(pos) {
          
          _carPos = pos
          
          _carMarker = addCarMarker(pos)
          
          showCancelMark()
        })
      },
      onFindCar:function() {
        
        onFindCar()
      }
    }
  })
}

function getFacilitys() {
  
  var temps = map.findUnitsWithType([1, 2, 3, 4, 5, 7, 8, 9, 10, 11])
  
  var icons = []
  
  for (var key in temps) {
  
    icons.push(getIcons(key))
  }
  
  return icons
}

var futi = {
  type:1,
  title:'扶梯',
  icon:'./static/扶梯.png'
}

var dianti = {
  
  type:2,
  title:'电梯',
  icon:'./static/电梯.png'
}

var xishoujian = {
  type:3,
  title:'洗手间',
  icon:'./static/洗手间.png'
}

var atm = {
  type:4,
  title:'ATM',
  icon:'./static/ATM.png'
}

var chukou = {
  type:5,
  title:'出口',
  icon:'./static/出口.png'
}

var rukou = {
  type:7,
  title:'入口',
  icon:'./static/入口.png'
}

var anquanchukou = {
  type:8,
  title:'安全出口',
  icon:'./static/people.png'
}

var louti = {
  type:9,
  title:'楼梯',
  icon:'./static/楼梯.png'
}

var xiche = {
  type:10,
  title:'洗车',
  icon:'./static/xiche.png'
}

var shoufeichu = {
  type:11,
  title:'收费处',
  icon:'./static/收费处.png'
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

import searchunit from './components/searchunit.vue'
let _searchunit = null
function showSearchUnitView() {
  
  if (_searchunit) {
  
    _searchunit.allunits = map.regionEx.getAllUnits(map.getFloorId())
    
    return
  }
  
  _searchunit = new Vue({
    el:'#searchunit',
    components: { searchunit },
    data: ()=> {
      return {
        allunits:map.regionEx.getAllUnits(map.getFloorId()),
        allfacilitys:getFacilitys()
      }
    },
    methods:{
      onNavigateToFacility:(facility)=>{
       
        console.log(facility)
        
        selectFacility(facility.type.toString())
      },
      onNavigateToUnit: (unit)=>{
      
        console.log(unit)
        
        selectUnit(unit)
      }
    }
  })
}

function addTempMarker(pos) {
  
  var marker = new indoorun.idrMapMarker.IDRTempMarker(pos, config.publicPath + '/static/markericon/temppoint.png')
  
  map.addMarker(marker)
  
  return marker
}

var _unitdetailview = null

function show(unit, cb) {
  
  _findCarBtnView.show = false
  
  if (_unitdetailview) {
  
    _unitdetailview.show = true
  
    _unitdetailview.unit = unit
  
    _unitdetailview.cb = cb
    
    return
  }
  
  _unitdetailview = new Vue({
    el:'#unitdetail',
    components:{ unitdetail },
    data:()=>{
      return {
        unit:unit,
        show:true,
        cb:cb
      }
    },
    methods:{
      clickbg:function() {
        
        this.show = false
  
        _findCarBtnView.show = true
      },
      onSetStart:function() {
      
        this.show = false
  
        _findCarBtnView.show = true
  
        this.cb && this.cb(0)
      },
      onSetEnd:function() {
  
        this.show = false
  
        _findCarBtnView.show = true
  
        this.cb && this.cb(1)
      }
    }
  })
}

function addEndMarker(pos) {
  
  var endMarker = new indoorun.idrMapMarker.IDREndMarker(pos, config.publicPath + '/static/markericon/终点.png')
  
  map.addMarker(endMarker)
  
  return endMarker
}

function addStartMaker(pos) {
  
  var marker = new indoorun.idrMapMarker.IDRStartMarker(pos, config.publicPath + '/static/markericon/起点.png')
  
  map.addMarker(marker)
  
  return marker
}

function selectUnit(unit) {
  
  Promise.resolve()
    .then(()=>{
    
      var marker = addTempMarker(unit.getPos())
      
      map.centerPos(unit.getPos(), true)
      
      return Promise.resolve(marker)
    })
    .then((marker)=>{
    
      return new Promise((resolve)=>{
        
        show(unit, (res)=>{
          
          if (res == 0) {
            
            resolve({action:'start', marker:marker})
          }
          else {
  
            resolve({action:'end', marker:marker})
          }
        })
      })
    })
    .then((res)=>{
    
      if (res.action === 'start') {
        
        map.removeMarker(res.marker)
  
        map.removeMarker(_startMarker)
  
        _startMarker = addStartMaker(unit.getPos())
  
        _startPos = unit.getPos()
      }
      
      if (res.action === 'end') {
  
        map.removeMarker(res.marker)
  
        map.removeMarker(_endMarker)
  
        _endMarker = addEndMarker(unit.getPos())
  
        _endPos = unit.getPos()
      }
      
      return promiseOfRoute(_startPos, _endPos)
    })
    .then((routersuccess)=>{
      
      if (routersuccess) {
        
        return new Promise((resovle)=>{
          
          showStopNavigate(resovle)
        })
      }
      
      return Promise.reject()
    })
    .then(()=>{
    
      resetStartEndPos()
    })
    .catch(()=>{
    
    })
}

function promiseOfRoute(start, end) {

  if (start && end) {
    
    map.doRoute(start, end)
    
    return Promise.resolve(true)
  }
  
  return Promise.resolve(false)
}

function selectFacility(type) {
  
  var types = []
  
  types.push(type)
  
  var temps = map.findUnitsWithType(types)
  
  if (type in temps && temps[type].length > 0) {
  
    selectUnit(temps[type][0])
  }
}

var _navigateStopView = null

function showStopNavigate(cb) {
  
  if (_navigateStopView) {
  
    _navigateStopView.show = true
  
    _navigateStopView.cb = cb
    
    return
  }
  
  _navigateStopView = new Vue({
    el:'#navigatestop',
    components:{ navigatestop },
    data:()=>{
      return {
        show:true,
        cb:cb
      }
    },
    methods:{
      click:function() {
        
        this.show = false
        
        map.stopRoute()
        
        this.cb && this.cb()
      }
    }
  })
}

function resetStartEndPos() {
  
  _startPos = null
  
  _endPos = null
  
  map.removeMarker(_startMarker)
  
  _startMarker = null
  
  map.removeMarker(_endMarker)
  
  _endMarker = null
}

var _cancelMarkView = null
function showCancelMark() {
  
  if (_cancelMarkView) {
  
    _cancelMarkView.show = true
    
    return
  }
  
  _cancelMarkView = new Vue({
    el:'#cancelmark',
    components:{ cancelmark },
    data:()=>{
      return {
        show:true
      }
    },
    methods:{
      clickbg:function() {
        
        this.show = false
      },
      click:function() {
        
        this.show = false
        
        _carPos = null
        
        map.removeMarker(_carMarker)
  
        _carMarker = null
      }
    }
  })
}
