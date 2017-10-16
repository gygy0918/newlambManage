<template>
  <div >
    <div id="container" style="width:500px; height:300px;margin:0 auto">室外</div>
    <br/>
    <div id="mapDiv" style="width:500px; height:300px">室内</div>

     <el-button type="primary" @click="addMarker">添加点标记覆盖物</el-button>
  </div>
</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8""></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script> 
  import AMap from 'AMap'
  var map
  var ln;
  var en;
  export default {
  data(){
    return{
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
    mounted: function () {
      this.init()

    },
    methods: {
      init: function () {
              //初始化地图对象，加载地图
            var clickListener,map = new AMap.Map("container", {
                  resizeEnable: true,
                  zoom: 16,
                  scrollWheel: false
              });

          //点击鼠标添加新的坐标点，并获得添加的位置信息
            map.on('click', function(e) {
             bind();
             var lnglatXY=[];
             lnglatXY.push(e.lnglat.getLng());
             lnglatXY.push(e.lnglat.getLat());
             // this.regeocoder(lnglatXY)

            console.log('您在[ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ]的位置点击了地图！');
            });
              //bt1的click的绑定事件
         var bind = function() {
              clickListener = AMap.event.addListener(map, "click", function(e) {
            new AMap.Marker({
              position: e.lnglat,
              map: map,
              draggable: true,
              cursor: 'move',
              raiseOnDrag: true,
            });
          });

  //拖拽
//    AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
//        var positionPicker = new PositionPicker({
//            mode: 'dragMap',
//            map: map
//        });
//           positionPicker.on('success', function(positionResult) {
//            console.log(positionResult.position);
//            console.log(positionResult.address);
//            console.log(positionResult.nearestJunction);
//            console.log(positionResult.nearestRoad);
//           console.log(positionResult.nearestPOI);
//        });
//        positionPicker.start();
//          map.panBy(0, 1);
//      });

      };//初始化完毕


              //后台返回地理位置信息
               var lnglats=[
                   [116.382122,39.921176],
                   [116.387271,39.922501],
                   [116.398258,39.914600]
               ];
               //点击弹出信息窗体
               var infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(0,-30)});
               //循环地理位置，进行标记
                          for(var i= 0,marker;i<lnglats.length;i++){
                             var marker=new AMap.Marker({
                                    position:lnglats[i],
                                    map:map,
                                    draggable: true,
                                    cursor: 'move',
                                    raiseOnDrag: true
                             });
                              marker.content='路灯位于'+lnglats[i];
                              marker.on('click',markerClick);
                              marker.emit('click',{target:marker});
                          } 
                        function markerClick(e){
        console.log('oooo',e.lnglat)
                            infoWindow.setContent(e.target.content);
                            infoWindow.open(map, e.target.getPosition());
                        }
              map.setFitView();
      },
//          addMarker(){
//            console.log(888888)
//                     var marker=new AMap.Marker({
//                    position:[116.368904,39.923423]
//                    });
//                    marker.setMap(map);  //在地图上添加点
//                          console.log('ppppp')
//              },

    }

  }
</script>
<style>
</style>