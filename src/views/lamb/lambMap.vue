<template>
  <div >
    <div id="container" style="width:500px; height:300px"></div>
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
          center: [116.358103,39.961554],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
      }
    }
  }
</script>
<style>
</style>