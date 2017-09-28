<template>
  <div >
    <div id="container" style="width:500px; height:300px;margin:0 auto">室外</div>
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
    //初始化地图对象，加载地图
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13
    });
     var lnglats=[
         [116.368904,39.923423],
         [116.382122,39.921176],
         [116.387271,39.922501],
         [116.398258,39.914600]
     ];
    var infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(0,-30)});
    for(var i= 0,marker;i<lnglats.length;i++){
          var marker=new AMap.Marker({
              position:lnglats[i],
              map:map
          });
        marker.content='我是第'+(i+1)+'个Marker';
        marker.on('click',markerClick);
        marker.emit('click',{target:marker});
    }
    function markerClick(e){
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }
    map.setFitView();

      }
    }
  }
</script>
<style>
</style>