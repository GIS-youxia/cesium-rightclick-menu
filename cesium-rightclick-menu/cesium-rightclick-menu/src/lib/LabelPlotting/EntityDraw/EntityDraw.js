/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2022-01-20
 * 类型：cesium 绘制面entity
 */

export default class EntityDraw {
  /**
   * @param viewer 三维视图
   */
  constructor(viewer) {
    this.viewer = viewer,
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
      this.initEvents();
  }

  /**
   * 激活
   */
  activate(drawType, color) {
    this.deactivate()
    this.clear()
    this.drawType = drawType
    this.polyColor = color
    this.positions = []
    this.tempPositions = []
    this.registerEvents()
    this.viewer.enableCursorStyle = false
    this.viewer._element.style.cursor = 'crosshair'
  }

  /**
   * 结束
   */
  deactivate() {
    this.unRegisterEvents(),
      this.drawType = undefined,
      this.polyColor = undefined,
      this.drawEntity = undefined,
      this.viewer._element.style.cursor = 'default',
      this.viewer.enableCursorStyle = true;
  }

  /**
   * 清除绘制内容
   */
  clear() {
    this.drawEntity && (this.viewer.entities.remove(this.drawEntity),
      this.drawEntity = undefined);
  }

  /**
   * 自定义事件
   */
  initEvents() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
      this.DrawStartEvent = new Cesium.Event(),
      this.DrawEndEvent = new Cesium.Event();
  }

  /**
   * 事件注册到cesium
   */
  registerEvents() {

    const vcTooltipDom = document.createElement('div')
    vcTooltipDom.style.cssText = `
          overflow: auto;
          position:absolute;
          background: rgba(0,0,0, .7);
          color:white;
          box-shadow: rgba(168, 168, 168, 0.295) 1px 2px 10px;
          border-radius:5px;
          padding: 5px 10px;
          display:inline-block;
          font-size:14px;
          z-index:2
        `
    // 设置id方便寻找
    vcTooltipDom.setAttribute('id', 'vc-tooltip')
    // 将浮层插入到body中
    document.body.appendChild(vcTooltipDom)
    document.getElementById('vc-tooltip').innerHTML = '点击左键开始，双击左键结束，点击右键取消'

    this.leftClickEvent()
    this.rightClickEvent()
    this.leftDoubleClickEvent()
    this.mouseMoveEvent()
  }

  /**
   * 左击事件
   */
  leftClickEvent() {
    var that = this;
    this.handler.setInputAction(function (pick) {
      that.viewer._element.style.cursor = 'crosshair';
      var pos = that.viewer.scene.pickPosition(pick.position);
      (
        pos = pos || that.viewer.scene.camera.pickEllipsoid(pick.position, that.viewer.scene.globe.ellipsoid)) &&
      (that.positions.push(pos), 1 == that.positions.length && that.handleFirstPosition());
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 第一个点
   */
  handleFirstPosition() {
    switch (this.drawType) {
      case 'Point':
        this.generatePoint(),
          this.drawEnd();
        break;
      case 'Polyline':
        this.generatePolyline();
        break;
      case 'Polygon':
        this.generatePolygon();
    }
  }

  /**
   * 类型为点、处理点
   */
  generatePoint() {
    this.drawEntity = this.viewer.entities.add({
      'position': this.positions[0],
      'point': {
        'pixelSize': 4,
        'color': Cesium.Color.RED
      }
    });
  }

  /**
   * 类型为线、处理线
   */
  generatePolyline() {
    var that = this;
    this.drawEntity = this.viewer.entities.add({
      'polyline': {
        'positions': new Cesium.CallbackProperty(function (e) {
            return that.tempPositions;
          }
          , false),
        'width': 2,
        'material': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        }),
        'depthFailMaterial': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        })
      }
    });
  }

  /**
   * 类型为面、处理面
   */
  generatePolygon() {
    const that = this;
    this.drawEntity = this.viewer.entities.add({
      Type: "EditablePolygon",
      'polygon': {
        'hierarchy': new Cesium.CallbackProperty(function (e) {
            return new Cesium.PolygonHierarchy(that.tempPositions);
          }
          , false),
        'material': Cesium.Color[that.polyColor].withAlpha(0.4),
        'perPositionHeight': false
      },
      'polyline': {
        'positions': new Cesium.CallbackProperty(function (e) {
          return that.tempPositions.concat(that.tempPositions[0]);
        }, false),
        'width': 1,
        'material': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        }),
        'depthFailMaterial': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        })
      }
    });
  }

  /**
   * 鼠标移入事件
   */
  mouseMoveEvent() {
    var that = this;
    this.handler.setInputAction(function (movement) {
      that.viewer._element.style.cursor = 'crosshair';
      var pos = that.viewer.scene.pickPosition(movement.endPosition);
      (pos = pos || that.viewer.scene.camera.pickEllipsoid
      (movement.startPosition, that.viewer.scene.globe.ellipsoid)) && that.drawEntity &&
      (that.tempPositions = that.positions
        .concat([pos]));
      document.onmousemove = function (e) {
        const vcTooltipDom = document.getElementById('vc-tooltip')
        if (vcTooltipDom) {
          vcTooltipDom.style.top = e.clientY + 15 + 'px'
          vcTooltipDom.style.left = e.clientX + 15 + 'px'
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 双击左键结束事件
   */
  leftDoubleClickEvent() {
    var that = this;
    this.handler.setInputAction(function (_0x3cb01c) {
      if (that.drawEntity) {
        switch (that.drawType) {
          case 'Polyline':
            that.drawEntity.polyline.positions =
              that.positions,
              that.minPositionCount = 2;
            break;
          case 'Polygon':
            that.drawEntity.polygon.hierarchy = that.positions,
              that.drawEntity.polyline.positions = that.positions.concat(that.positions[0]),
              that.minPositionCount = 3;
        }
        if (that.positions.length < that.minPositionCount)
          return that.clear(),
            void that.deactivate();
        that.drawEnd();
      } else
        that.deactivate();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  rightClickEvent() {
    this.handler.setInputAction(() => {
      const vcTooltipDom = document.getElementById('vc-tooltip')
      vcTooltipDom && document.body.removeChild(vcTooltipDom)
      this.clear()
      this.deactivate()
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  /**
   * 注销事件
   */
  unRegisterEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  /**
   * 结束绘制
   */
  drawEnd() {
    var that = this
    this.drawEntity.remove = function () {
      that.viewer.entities.remove(that.drawEntity);
    }
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom && document.body.removeChild(vcTooltipDom)
    this.DrawEndEvent.raiseEvent(this.drawEntity, this.positions, this.drawType)
    this.deactivate()
  }

}
