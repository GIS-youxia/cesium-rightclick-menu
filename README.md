## About

[Github地址](https://github.com/Weiwong1996/cesium-rightclick-menu.git)

<strong>Contact me on WeChat：<span style="color:aqua">_weiwong</span></strong>

## 功能说明

``` javascript
    将下图内的功能集合在本项目中，方便后续项目集成到需要的项目,用户在地图上右键点击弹出菜单。

      menuList: [
        {
          label: '查看坐标',
          icon: 'icon-chakanzuobiao',
          children: [
            {label: '选点', icon: 'icon-ditu', handler: 'choosePos', isSwitch: true, active: false},
            {label: '清除', icon: 'icon-shanchu', handler: 'clearPositions'}
          ]
        },
        {
          label: '场景服务', icon: 'icon-changjingjuanlian',
          children: [
            {label: '历史场景', icon: 'icon-lishijilu', handler: 'addSplitLayer', isSwitch: true, active: false},
            {label: '场景出图', icon: 'icon-xiangji1fill', handler: 'sceneToFile'}
          ]
        },
        {
          label: '视角切换', icon: 'icon-yanjing_xianshi',
          children: [
            {label: '地下开挖', icon: 'icon-xiayi', handler: 'initExcavate', isSwitch: true, active: false},
            {label: '环绕飞行', icon: 'icon-icon-feixingmanyou', handler: 'initFlyAround', isSwitch: true, active: false },
            {label: '第一视角', icon: 'icon-xingren', handler: 'initPeopleView', isSwitch: true, active: false},
            {label: '键盘漫游', icon: 'icon-jianpan', handler: 'initKeyboardTour', isSwitch: true, active: false}
          ]
        },
        {
          label: '地形分析', icon: 'icon-quanjing',
          children: [
            {label: '地形', icon: 'icon-yuanjing', handler: 'initTerrain', isSwitch: true, active: false},
            {label: '限高分析', icon: 'icon-jianzhu', handler: 'initLimitHeight', isSwitch: true, active: false},
            // {label: '填挖方分析', icon: 'icon-tianwafangfenxi', isSwitch: true, active: false},
            {label: '淹没分析', icon: 'icon-yanmeiguocheng', handler: 'initFloodAnalysis', isSwitch: true, active: false },
            {label: '最短路径分析', icon: 'icon-lujingfenxi', handler: 'initRouteAnalysis', isSwitch: true, active: false },
            {label: '缓冲区分析', icon: 'icon-hcq', handler: 'initBufferAnalysis', isSwitch: true,active: false}
          ]
        }, {
          label: '图上量算', icon: 'icon-celiang',
          children: [
            {label: '距离', icon: 'icon-juliceliang', handler: 'measureDistance'},
            {label: '面积', icon: 'icon-mianji', handler: 'measureArea'},
            {label: '高度', icon: 'icon-colum-height', handler: 'measureHeight'},
            // {label: '角度', icon: 'icon-a-ziyuan126', handler: 'measureDistance'},
            {label: '清除', icon: 'icon-shanchu', handler: 'measureClear'}
          ]
        }, {
          label: '图上标记', icon: 'icon-Markerbiaoji',
          children: [
            {label: '标记点', icon: 'icon-weizhi', handler: 'addMarkerPoint'},
            {label: '标记线', icon: 'icon-xianduan', handler: 'addMarkerLine'},
            {label: '标记面', icon: 'icon-polygon-fill', handler: 'addMarkerPolygon'},
            {label: '标记圆', icon: 'icon-ditu-yuan', handler: 'addMarkerCircular'},
            {label: '标记矩形', icon: 'icon-rect', handler: 'addMarkerRectangle'},
            {label: '清除', icon: 'icon-shanchu', handler: 'clearMarkers'}
          ]
        }, {
          label: '场景效果', icon: 'icon-zaixinqiumianchangjingchuangkoudakai',
          children: [
            {label: '下雨', icon: 'icon-shui', handler: 'startRain', isSwitch: true, active: false},
            {label: '下雪', icon: 'icon-xue', handler: 'startSnow', isSwitch: true, active: false},
            {label: '雾', icon: 'icon-wu', handler: 'startFog', isSwitch: true, active: false},
            {label: '夜视', icon: 'icon-yeshi', handler: 'startNightVision', isSwitch: true, active: false},
            {label: '黑白', icon: 'icon-heibai', handler: 'startB_W', isSwitch: true, active: false}
          ]
        }
      ]
```

## 引入方法

```html
1. npm i cesium-rightclick-menu
```

```javascript
2. 在main.js内引入
import cesiumRightclickMenu from 'cesium-rightclick-menu'

Vue.use(cesiumRightclickMenu)
```

```html
    3. 在index.html内引入
    <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3778628_tci473ef9mg.css">
```

```html
    4. 将CommonMapComp.vue作为组件引入到所需vue文件，及可创建一个包含右键功能菜单的三位地图。
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
```
## 参数说明
```javascript

    // 提供一个默认图片避免加载cesiumendpoint接口
    imageryProvider: 'http://xxx.xxx.xxx.xxx/logo/logo1.png'
    // 影像图地址
    imageMapUrl: 'http://xxx.xxx.xxx.xxx/tdt_yx/{z}/{x}/{reverseY}.jpg'
    // 定位图标
    locateImageUrl: 'http://xxx.xxx.xxx.xxx/cesium/resource/img/locate.png'
    // 地图地址
    mapUrl: 'http://xxx.xxx.xxx.xxx/tdt_dt/{z}/{x}/{reverseY}.jpg'
    // 开挖底图
    bottomImage: 'http://xxx.xxx.xxx.xxx/cesium/resource/img/kaiwa_bottom.png'
    // 开挖侧边图
    sideImage: 'http://xxx.xxx.xxx.xxx/cesium/resource/img/kaiwa_side.png'
    // 汽车模型
    carModel: 'http://xxx.xxx.xxx.xxx/cesium/resource/img/CesiumMilkTruck.glb'
    // 地图高程（地形）
    terrainProviderUrl: 'http://xxx.xxx.xxx.xxx/yhterrain'
    // 淹没分析图片
    floodImg: 'http://xxx.xxx.xxx.xxx/cesium/resource/img/flood.png'
```



