<template>
  <div class="map__wrap">
    <div id="map3d" style="width: 100%;height: 100%;">
      <div id="slider" v-if="sliderShow"></div>
    </div>
    <div
        class="alertMenu"
        ref="alertMenu"
        :style="alertMenuStyle"
        v-show="alertMenuState"
    >
      <div class="level__one">
        <div v-for="(item, index) in menuList"
             :key="index"
             :class="[activeIndex === index ? 'level__one__item active' : 'level__one__item']"
             @mouseover="handleHover(index)"
             :ref="`menuItem${index}`" @click="executionMethod(item.handler, undefined)">
          <div style="padding-left: 10px">
            <i :class="['icon iconfont ' + item.icon]"></i>
          </div>
          &nbsp;{{ item.label }}&emsp;
          <div v-if="item.children">
            <i class="icon iconfont icon-you" style="font-size: 12px"></i>
          </div>
        </div>
      </div>
      <div v-if="activeMenuList&&activeMenuList.length" class="level__two" :style="menu_level2Style">
        <div v-for="(child, cIndex) in activeMenuList"
             :key="cIndex"
             :class="[activeSubIndex === cIndex ? 'level__two__item active' : 'level__two__item']"
             @click="executionMethod(child.handler, cIndex)"
             @mouseover="handleSubHover(cIndex)">
          <div>
            <i :class="['icon iconfont ' + child.icon]"></i>
          </div>
          &nbsp;
          <span>{{ child.isSwitch ? child.active ? '关闭' : '开启' : '' }}</span>{{
            child.label
          }}
        </div>
      </div>
    </div>

    <div class="height__as" v-show="limitHeightShow">
      <div class="h__content">
        <div style="padding-right: 10px">
          高度:
        </div>
        <div>
          <el-slider v-model="height" :show-tooltip="true" @input="valueChange" :min="1" :step="0.5"
                     :max="1000"></el-slider>
        </div>
      </div>
    </div>

    <FcDialog :properties="properties" v-if="properties" class="fc_dialog"></FcDialog>

    <div v-if="delDialogShow" class="draw_dialog">
      <div class="close_icon" @click="delDialogShow = false"></div>
      <div class="outer_box">
        <div class="inner_box">
          <div class="content">
            确定删除？
          </div>
          <div style="display: flex;justify-content: space-around;">
            <div class="confirm_btn" @click="onCancel"><span>取消</span></div>
            <div class="confirm_btn" @click="onDelete"><span>确定</span></div>
          </div>
        </div>
      </div>
    </div>

    <!--    <dk-info-->
    <!--      v-if="dkInfoDialogShow"-->
    <!--      :properties-obj="propertiesObj"-->
    <!--      @changeActiveEntityColor="changeActiveEntityColor(arguments)"-->
    <!--      @close="handleDkInfoClose"-->
    <!--    ></dk-info>-->
    <!--    <video id="myVideo" muted="" autoplay="" loop="" crossorigin="" controls="">-->
    <!--      <source src="../../static/lukou.mp4" type="video/mp4">-->
    <!--    </video>-->
  </div>
</template>

<script>
import {
  cartesian2ToXyz,
  sceneToFile,
  cartesian3ToXyz,
  getLabelObj,
  addLabelText
} from "./utils/common_cesium"
import {disPlayPositionCtrl} from "./utils/common_tools"
import EntityDraw from "./lib/LabelPlotting/EntityDraw"
import MeasureTools from "./utils/measure"
import * as DTH from "./lib/DTH/DTH"
import FcDialog from "./FcDialog"

let positionEntity = []

export default {
  name: "cesium-rightclick-menu",
  components: {
    FcDialog: FcDialog,
  },

  /**
   * 由引入该组件的父组件提供
   * toCenter 跳转到某一点
   * loadRegion 需要加载的面的地址
   * enableRightClickDeletion 是否开启右键删除图层
   * showDkInfo 左键点击显示图层信息
   */
  props: {
    toCenter: {
      type: Function,
      default: function () {
        let pos = Cesium.Cartesian3.fromDegrees(107.966005, 30.364278, 17000000)//经纬度坐标转化为投影坐标
        let flyToOpts = {
          destination: {
            x: pos.x,
            y: pos.y,
            z: pos.z
          }
        }
        window.viewer.scene.camera.setView(flyToOpts)
      }
    },
    load3dTiles: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    loadRegion: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    enableRightClickDeletion: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    showDkInfo: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      alertMenuState: false,
      alertMenuStyle: {
        left: 0,
        top: 0,
      },
      menuList: [
        {
          label: '查看坐标',
          icon: 'icon-chakanzuobiao',
          // handler: 'showClickedPosition',
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
              label: '环绕飞行',
              icon: 'icon-icon-feixingmanyou',
              handler: 'initFlyAround',
              isSwitch: true,
              active: false
            },
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
            {
              label: '淹没分析',
              icon: 'icon-yanmeiguocheng',
              handler: 'initFloodAnalysis',
              isSwitch: true,
              active: false
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
      ],
      activeMenuList: [],
      menu_level2Style: {},
      activeIndex: null,
      activeSubIndex: 0,
      sliderShow: false,
      splitHandler: null,
      earthAtRightLayer: null,
      terrainExcavate: null,
      excavateDepth: null,
      isEditing: false,
      limitHeight: null,
      limitHeightShow: false,
      height: 30,
      maTool: null,
      mhTool: null,
      mdTool: null,
      markersArr: [],
      properties: null,
      highlightFace: null,
      delDialogShow: false,
      activeEntity: null,
      // dkInfoDialogShow: false,
      // propertiesObj: {},
      // videoPlane: null,
      isChoosePos: false
    }
  },

  methods: {
    initMap() {
      const viewerOption = {
        navigation: false,
        sceneModePicker: false,
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        baseLayerPicker: false, // 底图切换控件
        animation: false, // 控制场景动画的播放速度控件
        infoBox: false,//关闭自带弹窗,
        shouldAnimate: true,//开启漫游
        selectionIndicator: false,
        contextOptions: {
          webgl: {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            //通过canvas.toDataURL()实现截图
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
          }
        },
        // 提供一个默认图片避免加载cesiumendpoint接口
        // imageryProvider: new Cesium.SingleTileImageryProvider({
        //   url: require('./imgs/img.png'),
        // })
      }
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMWRhNjczZi1jODI2LTQzMTctYWM3Mi0yOTcwNjE4MmJhY2YiLCJpZCI6NzE0MzgsImlhdCI6MTYzOTk4MjEyMH0.RbSKlFOzNyLXNnFfq631lXEGMJzMYL0RzGhOUvnlZBY'
      let viewer = new Cesium.Viewer('map3d', viewerOption)
      viewer._cesiumWidget._creditContainer.style.display = "none"// 隐藏版权
      viewer.scene.globe.depthTestAgainstTerrain = true

      //线下影像
      const tms = new Cesium.UrlTemplateImageryProvider({
        url: Cesium.buildModuleUrl('http://120.27.230.6/tdt_yx') + '/{z}/{x}/{reverseY}.jpg',
        tilingScheme: new Cesium.GeographicTilingScheme(),
        maximumLevel: 19
      })

      let earthAtLeft = viewer.imageryLayers.addImageryProvider(tms)
      earthAtLeft.ImagerySplitDirection = Cesium.ImagerySplitDirection.LEFT
      // 导航控件
      // let pInfoStatusBar = new xt3d.SceneControl.PositionInfoStatusBar(viewer)
      window.viewer = viewer
      this.toCenter && this.toCenter()
      this.loadRegion && this.loadRegion()
      this.load3dTiles && this.load3dTiles()
    },
    initRightClick() {
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)
      let that = this
      handler.setInputAction(function (click) {
        that.activeIndex = null
        that.activeMenuList = []
        // that.rightClickedPosition = cartesian2ToXyz(click.position, window.viewer)
        const pickedFeature = window.viewer.scene.pick(click.position)

        // 点击到了entity
        if (pickedFeature && pickedFeature.id) {
          if (that.enableRightClickDeletion) {
            that.activeEntity = pickedFeature.id
            // 高亮显示
            if (that.highlightFace) {
              that.highlightFace.material = that.highlightFace.material0
            }
            pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material
            pickedFeature.id.polygon.material = Cesium.Color.AQUA.withAlpha(0.5)
            that.highlightFace = pickedFeature.id.polygon

            that.delDialogShow = true
          }
        } else {
          // 获取右键点击时，菜单栏出现的位置
          if (!that.isEditing) {
            that.alertMenuStyle = disPlayPositionCtrl(
                click.position.x, // 屏幕坐标x
                click.position.y, // 屏幕坐标y
                that.$refs.alertMenu.clientWidth, // 菜单栏宽度
                that.$refs.alertMenu.clientHeight // 菜单栏高度
            )
            // 显示右键菜单栏
            that.showOrHiddenRightClickMenu(true)
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    },
    initLeftClick() {
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)
      handler.setInputAction((click) => {
        const pickedFeature = window.viewer.scene.pick(click.position)
        if (this.isChoosePos) {
          let position = cartesian2ToXyz(click.position, window.viewer)
          this.showClickedPosition(position)
        } else {
          this.showOrHiddenRightClickMenu(false)
          // 取消高亮
          if (this.highlightFace) {
            this.highlightFace.material = this.highlightFace.material0
          }

          //显示图层信息
          if (pickedFeature && pickedFeature.id && pickedFeature.id.canShow) {
            this.activeEntity = pickedFeature.id
            pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material
            pickedFeature.id.polygon.material = Cesium.Color.AQUA
            this.highlightFace = pickedFeature.id.polygon
            // this.showDkInfo && this.showDkInfos()
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },

    // showDkInfos() {
    //   this.dkInfoDialogShow = true
    //   let entity = this.activeEntity
    //   this.propertiesObj = entity.propertiesObj
    // },

    // changeActiveEntityColor(args) {
    //   let color = getColor(args[0])
    //   this.activeEntity.polygon.material = Cesium.Color.fromCssColorString(color)
    //   this.activeEntity.label = getLabelObj(args[1])
    // },
    // handleDkInfoClose() {
    //   this.dkInfoDialogShow = false
    //   if (this.highlightFace) {
    //     this.highlightFace.material = this.highlightFace.material0
    //   }
    // },
    onCancel() {
      this.delDialogShow = false
    },
    onDelete() {
      //TODO
      window.viewer.entities.remove(this.activeEntity)
      this.delDialogShow = false
    },
    showOrHiddenRightClickMenu(state) {
      this.alertMenuState = state
    },
    handleHover(index) {
      this.activeIndex = index
      this.activeSubIndex = 0
      let dom = this.$refs[`menuItem${index}`]

      this.menu_level2Style = {
        marginTop: dom[0].offsetTop + 'px'
      }

      this.activeMenuList = this.menuList[index].children
    },
    handleSubHover(index) {
      this.activeSubIndex = index
    },
    executionMethod(fun, index) {
      if (index !== undefined && index.toString()) {
        this.activeMenuList[index].active = !this.activeMenuList[index].active
      }
      // 方法执行
      fun && this[fun]()

      this.showOrHiddenRightClickMenu(false)
    },
    showClickedPosition(position) {
      let et = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat),
        billboard: {
          image: "http://120.27.230.6/tjch/cesium/resource/img/locate.png",
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM//贴地属性
        },
      })
      window.viewer.entities.add(et)

      let str = position.lng + ',' + position.lat
      addLabelText(et, 'Point', str)
      positionEntity.push(et)
    },
    choosePos() {
      this.isChoosePos = !this.isChoosePos
    },
    clearPositions() {
      if (positionEntity.length) {
        positionEntity.forEach(item => {
          window.viewer.entities.remove(item)
        })
      }
    },
    sceneToFile() {
      sceneToFile(window.viewer)
    },
    addSplitLayer() {
      let layer1 = new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        minimumLevel: 1,
        maximumLevel: 18,
      })
      if (this.sliderShow) {
        this.splitHandler.destroy()
        this.splitHandler = null
        window.viewer.imageryLayers.remove(this.earthAtRightLayer)
        this.sliderShow = false
      } else {
        this.sliderShow = true
        this.$nextTick(() => {
          // const layer2 = new Cesium.UrlTemplateImageryProvider({
          //   url: "Cesium.buildModuleUrl('http://120.27.230.6/tdt_yx') + '/{z}/{x}/{reverseY}.jpg'",
          //   minimumLevel: 1,
          //   maximumLevel: 18,
          // })
          const layers = window.viewer.imageryLayers
          const earthAtRight = layers.addImageryProvider(layer1)
          this.earthAtRightLayer = earthAtRight
          // const earthAtLeft = layers.addImageryProvider(layer2)
          // earthAtLeft.splitDirection = Cesium.ImagerySplitDirection.LEFT
          earthAtRight.splitDirection = Cesium.ImagerySplitDirection.RIGHT

          const slider = document.getElementById("slider")
          if (slider) {
            window.viewer.scene.imagerySplitPosition =
                slider.offsetLeft / slider.parentElement.offsetWidth

            const handler = new Cesium.ScreenSpaceEventHandler(slider)
            this.splitHandler = handler

            let moveActive = false

            function move(movement) {
              if (!moveActive) {
                return
              }

              const relativeOffset = movement.endPosition.x
              const splitPosition =
                  (slider.offsetLeft + relativeOffset) /
                  slider.parentElement.offsetWidth
              slider.style.left = `${100.0 * splitPosition}%`
              window.viewer.scene.imagerySplitPosition = splitPosition
            }

            handler.setInputAction(function () {
              moveActive = true
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            handler.setInputAction(function () {
              moveActive = true
            }, Cesium.ScreenSpaceEventType.PINCH_START)

            handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE)

            handler.setInputAction(function () {
              moveActive = false
            }, Cesium.ScreenSpaceEventType.LEFT_UP)
            handler.setInputAction(function () {
              moveActive = false
            }, Cesium.ScreenSpaceEventType.PINCH_END)
          }
        })
      }
    },
    //初始化开挖
    initExcavate() {
      if (this.terrainExcavate) {
        this.terrainExcavate.clear()
        this.terrainExcavate = null
        let et = window.viewer.entities.getById('Polygon_Label')
        window.viewer.entities.remove(et)
      } else {
        this.isEditing = true
        this.terrainExcavate = new xt3d.ExcavateAnalysis.TerrainExcavate(window.viewer)
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove()
          addLabelText(result, 'Polygon', '开挖测试')
          this.$prompt('请输入大于0的数字', '开挖深度', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            inputErrorMessage: '数字格式不正确'
          }).then(({value}) => {
            this.terrainExcavate.add(positions, {
              excavateDepth: value,
              bottomImage: 'http://120.27.230.6/tjch/cesium/resource/img/kaiwa_bottom.png',
              sideImage: 'http://120.27.230.6/tjch/cesium/resource/img/kaiwa_side.png'
            })
            this.isEditing = false
          }).catch(() => {
            if (this.terrainExcavate) {
              this.terrainExcavate.clear()
              this.terrainExcavate = null
            }
            let et = window.viewer.entities.getById('Polygon_Label')
            window.viewer.entities.remove(et)
            this.activeMenuList[0].active = false
            this.isEditing = false
          })
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          if (this.terrainExcavate) {
            this.terrainExcavate.clear()
            this.terrainExcavate = null
          }
          let et = window.viewer.entities.getById('Polygon_Label')
          window.viewer.entities.remove(et)
          this.activeMenuList[0].active = false
          this.isEditing = false
        })
      }
    },
    initFlyAround() {
      if (this.windingPoint) {
        this.windingPoint.deactivate()
        window.viewer.entities.removeById('flyPoint')
        this.windingPoint = null
      } else {
        let note = this.$notify({
          title: '提示',
          message: '点击左键进行选点，围绕该点进行环绕飞行',
          duration: 0
        })
        this.initEntityDraw()
        this.drawActivate('Point')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          note.close()
          result.remove()
          window.viewer.entities.add({
            id: 'flyPoint',
            position: positions[0],
            point: {
              pixelSize: 4,
              color: Cesium.Color.RED,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
          })
          this.windingPoint = new xt3d.CameraDominate.WindingPoint(window.viewer, positions[0])
          this.windingPoint.activate()
        })
      }
    },

    // 漫游轨迹
    initPeopleView() {
      if (this.roamObj) {
        this.roamObj.stop()
        this.roamObj = null
        window.viewer.entities.removeById('romaLine')
      } else {
        let note = this.$notify({
          title: '提示',
          message: '请先绘制运动路径',
          duration: 0
        })
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polyline')

        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {

          this.isEditing = false
          note.close()
          result.remove()

          window.viewer.entities.add({
            id: 'romaLine',
            polyline: {
              positions: new Cesium.CallbackProperty(e => {
                return positions
              }, false),
              width: 3,
              material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.YELLOW,
              }),
              depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.YELLOW,
              }),
            }
          })

          //创建漫游对象
          this.roamObj = new xt3d.TrackRoam.Roam(window.viewer, positions, {
            speed: 10,
            modelUrl: 'http://120.27.230.6/tjch/cesium/resource/img/CesiumMilkTruck.glb',
            scale: 1, // 大小
            role: 2
          })
          this.roamObj.start()
        })
      }
    },

    //键盘漫游
    initKeyboardTour() {
      if (this.keyboardModel) {
        this.keyboardModel.deactivate()
        this.keyboardModel = null
      } else {
        let note = this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: '点击左键选择起点，使用' +
              '<span style="color: darkcyan">W</span>（前进）' +
              '<span style="color: darkcyan">A</span>（左转）' +
              '<span style="color: darkcyan">S</span>（后退）' +
              '<span style="color: darkcyan">D</span>（右转）进行控制',
          duration: 0
        })
        this.initEntityDraw()
        this.drawActivate('Point')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          note.close()
          result.remove()
          this.keyboardModel = new xt3d.KeyboardDominate.KeyboardModelExt(window.viewer, positions[0], {
            modelUrl: "http://120.27.230.6/tjch/cesium/resource/img/CesiumMilkTruck.glb",
            scale: 1,
            minimumPixelSize: 20,
            angle: 1, //转弯角度大小 越大转得越快
            speed: 1, //速度,
            role: 1, //0 自由视角 1 第一视角
            aotuPickHeight: false //是否拾取高度
          })
          this.keyboardModel.activate()
        })
      }
    },
    initTerrain() {
      //线下高程
      if (window.viewer.terrainProvider._scheme) {
        viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
      } else {
        window.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
          url: "http://120.27.230.6/yhterrain",
        })
      }
    },
    valueChange() {
      this.limitHeight && this.limitHeight.setHeight(this.height)
    },
    initLimitHeight() {
      if (this.limitHeight) {
        this.limitHeight.remove()
        this.limitHeight = null
        this.limitHeightShow = false
      } else {
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove()
          let arr = []
          positions.forEach(item => {
            let obj = cartesian3ToXyz(item, window.viewer)
            arr.push(obj.lng)
            arr.push(obj.lat)
          })
          this.limitHeightShow = true
          this.limitHeight = new xt3d.SpatialAnalysis.LimitHeight(window.viewer, arr, 30)
          this.isEditing = false
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          this.limitHeight.remove()
          this.limitHeight = null
          this.limitHeightShow = false
          this.isEditing = false
        })
      }
    },
    initFloodAnalysis() {
      const {viewer} = window
      if (viewer.entities.getById('floodEntity')) {
        viewer.entities.remove(viewer.entities.getById('floodEntity'))
      } else {
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove()
          this.$prompt('请输入大于0的数字', '淹没深度', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            inputErrorMessage: '数字格式不正确'
          }).then(({value}) => {
            this.flood(positions, value)
            this.isEditing = false
          }).catch(() => {
            viewer.entities.remove(viewer.entities.getById('floodEntity'))
            this.activeMenuList[2].active = false
            this.isEditing = false
          })
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          viewer.entities.remove(viewer.entities.getById('floodEntity'))
          this.isEditing = false
        })
      }
    },
    //淹没分析
    flood(positions, value) {
      var currentHeight = 1
      var maxHeight = value
      var times = 2
      var speed = (maxHeight - currentHeight) / times
      let entity = window.viewer.entities.add({
        id: "floodEntity",
        polygon: {
          //hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(adapCoordi),
          hierarchy: positions,
          closeTop: true,
          closeBottom: true,
          fill: true,
          //获取或设置分类类型属性，指定此多边形在地面上时是否对地形、3D瓷砖或两者进行分类。
          classificationType: Cesium.ClassificationType.BOTH,
          material: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString("#007FFF"), 0.4),
          perPositionHeight: true,
          //一个属性，其值由回调函数延迟评估。time, result
          extrudedHeight: 0,
        },
      })
      //设置高度随时间变化
      var setFlood = setInterval(() => {
        if (currentHeight < maxHeight) {
          currentHeight += speed / 30
          entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function (time, result) {
            return currentHeight
          }, false)
          if (currentHeight > maxHeight) {
            currentHeight = maxHeight
            clearInterval(setFlood)
          }
        }
      }, 1000 / 30)
    },
    createPolygon(points) {
      //primitive方式创建.可以制作出水波纹效果。adapCoordi
      let waterPrimitive = new Cesium.Primitive({
        allowPicking: false,
        asynchronous: false,
        geometryInstances: new Cesium.GeometryInstance({
          id: 'floodGeoInstance',
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(points),
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            extrudedHeight: 1,
            height: 0,
          }),
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
          //当为 true 时，几何体应位于椭圆体的表面上,不是在其上方的恒定高度
          aboveGround: true,
          material: new Cesium.Material({
            fabric: {
              type: 'Water',
              uniforms: {
                // blendColor: new Cesium.Color(0, 0, 1, 0.3),
                normalMap: Cesium.buildModuleUrl('http://120.27.230.6/tjch/cesium/resource/img/flood.png'),
                //频率速度设置
                frequency: 10000,
                animationSpeed: 0.01,
                amplitude: 1.0,
              }
            },
          })
        })
      })
      this.tileset1 = window.viewer.scene.primitives.add(waterPrimitive)
      // waterPrimitive.update()
      // var sui = waterPrimitive.getGeometryInstanceAttributes('floodGeoInstance')
    },

    initMeasure() {
      let fun = () => {
        this.isEditing = false
      }
      this.mdTool = new MeasureTools(window.viewer, 'distance', fun)
      this.maTool = new MeasureTools(window.viewer, 'area', fun)
      this.mhTool = new MeasureTools(window.viewer, 'height', fun)
    },

    measureDistance() {
      this.isEditing = true
      this.mdTool.initMeasureTools()
    },
    measureArea() {
      this.isEditing = true
      this.maTool.initMeasureTools()
    },
    measureHeight() {
      this.isEditing = true
      this.mhTool.initMeasureTools()
    },
    measureClear() {
      this.mdTool.clear()
      this.maTool.clear()
      this.mhTool.clear()
    },

    // 父组件自发调用
    spontaneousCall(options) {
      this[options.fun]()
    },

    // 添加标记
    initMarkerTool() {
      this.militaryPlotLayer = new xt3d.LabelPlotting.MilitaryPlot.PlotLayer(window.viewer)
      this.militaryPlotLayer.setPlotSelectable(true)
      this.plotDraw = new xt3d.LabelPlotting.MilitaryPlot.PlotDraw(window.viewer)
      this.plotDraw.PlotDrawEndEvent.addEventListener((drawPlot, plotType) => {
        drawPlot.remove()
        this.isEditing = false
        this.militaryPlotLayer.addPlot(drawPlot.toGeoJson())
      })
    },
    addMarkerPoint() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Point')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记点', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Point', value)
          this.markersArr.push(result) // 存一下方便删除
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        })
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerLine() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Polyline')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记线段', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Polyline', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        })
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerPolygon() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Polygon')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记面', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Polygon', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          // result.remove() 不起作用
          window.viewer.entities.remove(result)
          this.isEditing = false
        })
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerCircular() {
      this.isEditing = true
      // this.plotDraw.activate('circle')
      this.initEntityDraw()
      this.drawActivate('Circle')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记圆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Circle', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          // result.remove() 不起作用
          window.viewer.entities.remove(result)
          this.isEditing = false
        })
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerRectangle() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Rectangle')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记矩形', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Rectangle', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        })
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    clearMarkers() {
      this.markersArr.forEach(item => {
        window.viewer.entities.remove(item)
        let et = window.viewer.entities.getById('Polygon_Label')
        window.viewer.entities.remove(et)
      })
      this.militaryPlotLayer.clear()
    },

    // 图层效果
    startRain() {
      if (this.weatherEffect1) {
        this.weatherEffect1.removeEffect()
        this.weatherEffect1 = null
      } else {
        this.weatherEffect1 = new xt3d.SceneDominate.WeatherEffect(window.viewer)
        this.weatherEffect1.addRainEffect()
      }
    },
    startSnow() {
      if (this.weatherEffect2) {
        this.weatherEffect2.removeEffect()
        this.weatherEffect2 = null
      } else {
        this.weatherEffect2 = new xt3d.SceneDominate.WeatherEffect(window.viewer)
        this.weatherEffect2.addSnowEffect()
      }
    },
    startFog() {
      if (this.weatherEffect3) {
        this.weatherEffect3.removeEffect()
        this.weatherEffect3 = null
      } else {
        this.weatherEffect3 = new xt3d.SceneDominate.WeatherEffect(window.viewer)
        this.weatherEffect3.addFogEffect()
      }
    },

    startNightVision() {
      if (this.nightVisionEffect) {
        this.nightVisionEffect.enabled = false
        this.nightVisionEffect = null
      } else {
        this.nightVisionEffect = new xt3d.SceneDominate.NightVisionEffect(window.viewer)
        this.nightVisionEffect.enabled = true
      }
    },
    startB_W() {
      if (this.BlackAndWhiteEffect) {
        this.BlackAndWhiteEffect.remove()
        this.BlackAndWhiteEffect = null
      } else {
        this.BlackAndWhiteEffect = new xt3d.SceneDominate.BlackAndWhiteEffect(window.viewer)
        this.BlackAndWhiteEffect.enabled = true
      }
    },

    //初始化绘制
    initEntityDraw() {
      this.entityDraw = new EntityDraw(window.viewer)
    },
    //激活绘制
    drawActivate(type) {
      this.entityDraw.activate(type)
      // this.terrainExcavate.clear()
    },
    initDthFd() {
      // 按栋进行单体化
      this.fdDTH = new DTH.Fd(window.viewer, {
        fdDataServerBaseUrl: "http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Axssq&maxFeatures=5000&outputFormat=application%2Fjson"
      })

      this.fdDTH.BuildingSelectedEvent.addEventListener((properties, position, type, fid, isDelete = false) => {
        // TODO 分栋完成后的操作
      })
      this.fdDTH.activate()
    },
    initDthFc() {
      let fcDTH = new DTH.Fc(window.viewer, {
        fcDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afc_offset&maxFeatures=5000&outputFormat=application%2Fjson"
      })
      fcDTH.FloorSelectedEvent.addEventListener((feature) => {
        if (feature) {
          this.properties = feature.properties
        } else {
          this.properties = null
        }
      })

      fcDTH.activate()
    },
    initDthFh() {
      let fhDTH = new DTH.Fh(window.viewer, {
        fcDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afc_offset&maxFeatures=50&outputFormat=application%2Fjson",
        //geoserver数据服务的地址 分户数据地址 分层数据中的楼栋编号和分户数据中的楼编号一致
        fhDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afh_offset&maxFeatures=50&outputFormat=application%2Fjson"
      })
      fhDTH.HouseSelectedEvent.addEventListener((feature) => {
        if (feature) {
          this.properties = feature.properties
        } else {
          this.properties = null
        }
      })

      fhDTH.activate()
    },
    addVideo() {
      let position = Cesium.Cartesian3.fromDegrees(120.3008555978398, 30.406375251999187, 10)
      let et = window.viewer.entities.add({
        position: position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW
        }
      })
      window.viewer.zoomTo(et)
      const videoElement = document.getElementById("myVideo")

      // 参考 https://www.freesion.com/article/83151307019/
      // 时钟同步
      let synchronizer = new Cesium.VideoSynchronizer({
        clock: viewer.clock,
        element: videoElement
      })
      window.viewer.clock.shouldAnimate = true
      videoElement.style.display = 'none'
      this.videoPlane = new xt3d.VideoPlugin.VideoPlane(window.viewer, position, {
        videoElement: videoElement,
        rotation: {
          heading: 90,
          pitch: 80,
          roll: 0
        },
        near: 0,
        far: 30, //距离
        fov: 29, //张角
        aspectRatio: 1,
        stRotation: 301,
        debugFrustum: true //是否显示投影线
      })
    },
    closeVideo() {
      this.videoPlane.remove()
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false")
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false")

      document.onclick = () => {
        this.alertMenuState = false
      }

      //由调用者提供需要加载的方法
      this.$on('spontaneousCall', (e) => {
        this.spontaneousCall(e)
      })
    })
    this.initMap()
    this.initRightClick()
    this.initLeftClick()
    this.initMeasure() // 测量工具
    this.initMarkerTool()
  },
  beforeDestroy() {
    window.viewer.entities.removeAll()
    window.viewer.imageryLayers.removeAll(true)
    window.viewer.destroy()
  }
}
</script>

<style scoped lang="less">
.map__wrap {
  position: relative;
  overflow: hidden;
  height: 100%;

  .alertMenu {
    position: absolute;
    display: flex;
    width: 320px;
    height: 250px;
    border-radius: 4px;
    z-index: 9999;

    .level__one {
      border: 1px solid rgba(53, 123, 181, 0.6);
      background: #081A26;
      //width: 38%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      color: #CCE3FF;
      font-size: 14px;

      .level__one__item {
        padding: 5px 0;
        width: 100%;
        display: flex;
      }

    }

    .active {
      background-color: rgba(53, 123, 181, 0.6);
    }

    .level__two {
      border: 1px solid rgba(53, 123, 181, 0.6);
      background: #081A26;
      margin-left: 2px;
      width: 40%;
      display: flex;
      align-self: baseline;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      color: #CCE3FF;
      font-size: 14px;

      .level__two__item {
        padding: 5px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .height__as {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #081A26;
    border: 1px solid rgba(53, 123, 181, 0.6);
    width: 200px;
    padding: 10px;

    .h__content {
      display: flex;
      align-items: center;
      color: white;
    }
  }

  .fc_dialog {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #081A26;
    border: 1px solid rgba(53, 123, 181, 0.6);
    width: 200px;
    padding: 10px;
    color: white;
  }

  .el-slider {
    width: 140px;
  }
}

#slider {
  position: absolute;
  left: 50%;
  top: 0;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}

#slider:hover {
  cursor: ew-resize;
}
</style>
