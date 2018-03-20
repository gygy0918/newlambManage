<template>
  <div >
    <div id="container" style="float: left;width:600px; height:600px;margin:0">室外</div>
    <div id="outer-box" style="margin-left: 620px;">
      <div id="eventInfo">事件信息</div>
      </div>
      <div id="panel">
        <div id="intro">
          <h3>事件监听</h3>
        </div>
        <ul id="my-list" ></ul>
      </div>
  </div>
</template>
<script src="http://webapi.amap.com/maps?v=1.3&key=70d7bf19a3d97be874adc1b3b76a07a8"></script>
<script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
  import AMap from 'AMap'
  export default {
  data(){
    return{
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
              });

          AMapUI.loadUI(['misc/MarkerList', 'overlay/SvgMarker', 'overlay/SimpleInfoWindow'],
              function(MarkerList, SvgMarker, SimpleInfoWindow){
                  if (!SvgMarker.supportSvg) {
                      //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
                      alert('当前环境不支持SVG');
                  }
                  var markerList = new MarkerList({
                      //关联的map对象
                      map: map,
                      //列表的dom容器的id
                      listContainer: 'my-list',
                      //需要监听的列表节点事件
                      listElementEvents: ['click'],
                      //需要监听的marker事件
                      markerEvents: ['click', 'mouseout'],
                      //需要监听的infoWindow事件
                      infoWindowEvents: ['click', 'mouseover', 'mouseout'],
                      //返回数据项的Id
                      getDataId: function(dataItem, index) {
                          //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                          return dataItem.id;
                      },
                      //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                      getPosition: function(dataItem) {
                          return dataItem.position;
                      },
                      //返回数据项对应的Marker
                      getMarker: function(dataItem, context, recycledMarker) {
                          var label = dataItem.id;
                          var flag=dataItem.status;
                          //存在可回收利用的marker
                          if (recycledMarker) {
                              //直接更新内容返回
                              recycledMarker.setIconLabel(label);
                              return recycledMarker;
                          }
                          //返回一个新的Marker
                          return new SvgMarker(
                              new SvgMarker.Shape.TriangleFlagPin({
                                  height: 50,
                                  strokeWidth: 1,
                                  strokeColor: '#ccc',
                                  fillColor: flag?'green':'red'
                              }), {
//                                  iconLabel: label,
                                  containerClassNames: 'my-svg-marker',
                                  showPositionPoint: true
                              })
                      },
                      //返回数据项对应的列表节点
                      getListElement: function(dataItem, context, recycledListElement) {

                          var tpl = '<p><%- dataItem.desc+dataItem.id %>［如果室外图片］：<br/>室内<table>' +
                              '<tr><th>1</th><th>1</th><th>1</th>' +
                              '</tr><tr><th>2</th><th>2</th><th>2</th></tr>' +
                              '<tr><th>3</th><th>3</th><th>3</th></tr></table>';

                          var content = MarkerList.utils.template(tpl, {
                              dataItem: dataItem,
                              dataIndex: context.index
                          });

                          if (recycledListElement) {
                              //存在可回收利用的listElement, 直接更新内容返回
                              recycledListElement.innerHTML = content;
                              return recycledListElement;
                          }

                          //返回一段html，MarkerList将利用此html构建一个新的dom节点
                          return '<li>' + content + '</li>';
                      },
                      getInfoWindow: function(dataItem, context, recycledInfoWindow) {

                          if (recycledInfoWindow) {
                              //存在可回收利用的infoWindow, 直接更新内容返回
                              recycledInfoWindow.setInfoTitle(dataItem.title);
                              recycledInfoWindow.setInfoBody(dataItem.desc);
                              return recycledInfoWindow;
                          }

                          //返回一个新的InfoWindow
                          return new SimpleInfoWindow({
                              offset: new AMap.Pixel(0, -57),
                              infoTitle: dataItem.desc+dataItem.id,
                              infoBody:  dataItem.status?'当前状态：正常':'当前状态：危险'
                          });
                      }
                  })//对象创建完毕
                  markerList.on('listElementClick listElementMouseenter listElementMouseleave ' +'markerClick markerMouseover'+
                      'infoWindowClick infoWindowMouseover infoWindowMouseout',
                      function(event, record) {
                        console.log('事件信息event',event,'record',record)
                          console.log('record',record.listElement)
                          var $ = MarkerList.utils.$,
                              template = MarkerList.utils.template;

                          $('#eventInfo').html(template('<%- record.data.desc+record.id%>: <%- record.desc %>' +
                                  '<div class="eventType">所有权：<%-record.data.ower%></div>'+
                              '<div class="eventType">连接方式：<%-record.data.way%></div>'+
                              '<div class="eventType">剩余电量：<%-record.data.power %></div>', {
                              event: event,
                              record: record
                          }));
                      });
                  markerList.on('markerClick markerMouseover ',function (event, record) {
                      var pre=record.listElement;
                      pre.style.background='red';
                  })
//                  markerList.on('markerMouseout ',function (event, record) {
//                      record.listElement.style.background='';
//                  })
                  //监听选中改变
                  markerList.on('selectedChanged', function(event, info) {
                      info.selected.listElement.style.background='';
                      console.log('****event',event,'info', info);
                  });
                  //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
                  var data = [{
                      id: '123',
                      position: [116.020764, 39.904989],
                      desc: '井盖_1',
                      status:0,
                      power:'30%',
                      way:'WIFI',
                      ower:'北京市国税局'
                  }, {
                      id: '234',
                      position: [116.405285, 39.904989],
                      desc: '井盖_2',
                      status:1,
                      power:'80%',
                      way:'WIFI',
                      ower:'北京房管局'
                  }, {
                      id: '345',
                      position: [116.789806, 39.904989],
                      desc: '井盖_3',
                      status:1,
                      power:'60%',
                      way:'4G',
                      ower:'北京水利'
                  }];
                  //展示该数据
                  markerList.render(data);


              })

      },//初始化完毕



      },


  }
</script>
<style>
  #eventInfo {
    position: absolute;
    z-index: 9999;
    right: 570px;
    top: 20px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 7px;
    min-width: 100px;
    line-height: 170%;
  }

  .eventType {
    font-size: 120%;
    letter-spacing: 1px;
    color: red;
  }
  .active{background:yellow;}
  .my-svg-marker .amap-simple-marker-label {
    color: #fff;
    top: 10px;
    font-size: 20px;
  }
</style>