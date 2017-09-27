<template>
  <div >
    <div id="container" style="width:500px; height:300px;display:none">室外</div>
    <br/>
    <div id="mapDiv" style="width:500px; height:300px">室内</div>
  </div>
</template>
<script>
  import AMap from 'AMap'
  var map
  export default {
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        map = new AMap.Map('container', {
          center: [116.364695,39.967366],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })


var indoorMap;        
AMap.plugin(['AMap.IndoorMap'], function() {        
var indoorMap = new AMap.IndoorMap({alwaysShow:true});  
var map = new AMap.Map('mapDiv',
 { resizeEnable: true,  
  showIndoorMap:false,        
  floorControl:false,            
  center: [121.318911,31.193987],            
  zoom:19,           
  resizeEnable: true,            
  layers:[indoorMap,new AMap.TileLayer()]         });       
   // indoorMap.showIndoorMap('B000A856LJ',4);       
    indoorMap.on('floor_complete',function(status, object){          

      console.log(status.building.floor)        })      });
      }
    }
  }
</script>
<style>
</style>