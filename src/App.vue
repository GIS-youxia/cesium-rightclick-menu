<template>
  <div id="app">
    <cesium-rightclick-menu
        :imageryProvider="imageryProvider"
        :imageMapUrl="imageMapUrl"
        :locate-image-url="locateImageUrl"
        :map-url="mapUrl"
        :bottom-image="bottomImage"
        :side-image="sideImage"
        :car-model="carModel"
        :terrain-provider-url="terrainProviderUrl"
        :flood-img="floodImg"
    >
    </cesium-rightclick-menu>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 提供一个默认图片避免加载cesiumendpoint接口
      imageryProvider: 'http://120.27.230.6/tjch/logo/logo1.png',
      // 影像图地址
      imageMapUrl: 'http://120.27.230.6/tdt_yx/{z}/{x}/{reverseY}.jpg',
      // 定位图标
      locateImageUrl: 'http://120.27.230.6/tjch/cesium/resource/img/locate.png',
      // 地图地址
      mapUrl: 'http://120.27.230.6/tdt_dt/{z}/{x}/{reverseY}.jpg',
      // 开挖底图
      bottomImage: 'http://120.27.230.6/tjch/cesium/resource/img/kaiwa_bottom.png',
      // 开挖侧边图
      sideImage: 'http://120.27.230.6/tjch/cesium/resource/img/kaiwa_side.png',
      // 汽车模型
      carModel: 'http://120.27.230.6/tjch/cesium/resource/img/CesiumMilkTruck.glb',
      // 地图高程（地形）
      terrainProviderUrl: 'http://120.27.230.6/yhterrain',
      // 淹没分析图片
      floodImg: 'http://120.27.230.6/tjch/cesium/resource/img/flood.png'
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  font-size: unset;
  overflow: hidden;
  position: relative;
}

#app {
  height: 100%;
}
</style>
