项目地址

## 功能说明

``` javascript
    将下图内的功能集合在本项目中，方便后续项目集成到需要的项目,用户在地图上右键点击弹出菜单。

      menuList: [
        {
          label: '查看坐标',
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
            {
              label: '环绕飞行', ...
            },
            {label: '第一视角', ...},
            {label: '键盘漫游', ...}
          ]
        },
        {
          label: '地形分析', icon: 'icon-quanjing',
          children: [
            {label: '地形', icon: 'icon-yuanjing', handler: 'initTerrain', isSwitch: true, active: false},
            {label: '限高分析', icon: 'icon-jianzhu', handler: 'initLimitHeight', isSwitch: true, active: false},
            // {label: '填挖方分析', icon: 'icon-tianwafangfenxi', isSwitch: true, active: false},
            {
              label: '淹没分析', ...
            }
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

## 目录结构描述

    ├── imgs   // 图片图标等
    ├── js   // 图片图标等
    |   |── cesium_tools.js // cesium js库
    ├── lib   // 包含各版本的lib文件夹
    ├── utils // 工具及通用函数
    ├── CommonMapComp.vue      // 主菜单文件，包含三维地图的创建
    ...
    ├── ReadMe.md           // 帮助文档

## 引入方法

```javascript
1. npm i cesium-rightclick-menu
```
``` javascript
2. 在main.js内引入
    import cesiumRightclickMenu from 'cesium-rightclick-menu'
    Vue.use(cesiumRightclickMenu)
```

```html
3. 将CommonMapComp.vue作为组件引入到所需vue文件，及可创建一个包含右键功能菜单的三位地图。

    <cesium-rightclick-menu
            style="width: 100%; height: 100%"
            :to-center="toCenter"
            :load3d-tiles="load3dTiles"
            :tile-set-url="tileSetUrl"
    ></cesium-rightclick-menu>
```



