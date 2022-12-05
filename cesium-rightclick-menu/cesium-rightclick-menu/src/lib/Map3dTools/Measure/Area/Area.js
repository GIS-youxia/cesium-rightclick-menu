/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2021-11-17
 * 类型：cesium测量
 */
export default class Area {

  /**
   * @param {Object} viewer 当前视图对象
   */
  constructor(viewer) {
    this.viewer = viewer,
      this.initEvents(),
      this.positions = [],
      this.tempPositions = [],
      this.vertexEntities = [],
      this.labelEntity = undefined,
      this.measureArea = 0;
  }

  /**
   * 初始化事件
   */
  initEvents() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
      this.MeasureStartEvent = new Cesium.Event(),
      this.MeasureEndEvent = new Cesium.Event();
  }

  /**
   * 创建entity
   */
  createPolygonEntity() {
    var that = this;
    this.polygonEntity = this.viewer.entities.add({
      id: 'customize',
      'polygon': {
        'hierarchy': new Cesium.CallbackProperty(function (e) {
          return new Cesium.PolygonHierarchy(that.tempPositions);
        }, false),
        'material': Cesium.Color.RED.withAlpha(0.4),
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
   * 创建顶点entity
   */
  createVertex() {
    var vertexEntity = this.viewer.entities.add({
      'position': this.positions[this.positions.length - 1],
      'type': 'MeasureAreaVertex',
      'point': {
        'color': Cesium.Color.FUCHSIA,
        'pixelSize': 8,
        'disableDepthTestDistance': 500
      }
    });
    this.vertexEntities.push(vertexEntity);
  }

  /**
   * 创建结果展示label
   */
  createResultLabel() {
    var that = this;
    this.mesureResultEntity = this.viewer.entities.add({
      'position': new Cesium.CallbackProperty(function (e) {
        return that.getCenterPosition();
      }, false),
      'type': 'MeasureAreaResult',
      'label': {
        'text': new Cesium.CallbackProperty(function (e) {
          return '面积' + that.getArea(that.tempPositions) + '平方米';
        }, false),
        'scale': 0.5,
        'font': 'normal 28px MicroSoft YaHei',
        'distanceDisplayCondition': new Cesium.DistanceDisplayCondition(0, 5000),
        'scaleByDistance': new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
        'verticalOrigin': Cesium.VerticalOrigin.BOTTOM,
        'style': Cesium.LabelStyle.FILL_AND_OUTLINE,
        'pixelOffset': new Cesium.Cartesian2(0, -30),
        'outlineWidth': 9,
        'outlineColor': Cesium.Color.YELLOW
      }
    });
  }

  /**
   * 获取中心点
   */
  getCenterPosition() {
    var that = this
    // let pointArr = [];
    if (this.tempPositions.length < 3) {
      return this.tempPositions[0];
    }
    // this.tempPositions.forEach(function (position) {
    //   position = that.cartesian3ToPoint3D(position),
    //   pointArr.push([position.x,position.y]);
    // });
    // //求相交缓冲区交点
    // var hcq = turf.lineString(pointArr),
    // hcq = turf.bbox(hcq),
    // hcq = turf.bboxPolygon(hcq),
    // hcq = turf.center(hcq).geometry.coordinates;

    let position = that.cartesian3ToPoint3D(this.tempPositions[this.tempPositions && this.tempPositions.length - 1])
    return Cesium.Cartesian3.fromDegrees(position.x, position.y, this.height + 20);
  }

  /**
   * 注册鼠标事件
   */
  registerEvents() {

    // 开始绘制时添加一个div作为提示
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
    vcTooltipDom.setAttribute('id', 'vc-tooltip')
    // 将浮层插入到body中
    document.body.appendChild(vcTooltipDom)
    document.getElementById('vc-tooltip').innerHTML = '点击左键开始绘制，右键结束'

    this.leftClickEvent(),
      this.rightClickEvent(),
      this.mouseMoveEvent();
  }

  /**
   * 左击事件
   */
  leftClickEvent() {
    var that = this;
    this.handler.setInputAction(function (movement) {
      // that.viewer._element.style.cursor = 'crosshair';
      var pos,
        pickPos = that.viewer.scene.pickPosition(movement.position);
      pickPos || (pos = that.viewer.scene.globe.ellipsoid,
        pickPos = that.viewer.scene.camera.pickEllipsoid(movement.position, pos)), pickPos && (
        that.positions.push(pickPos),
          that.height = that.unifiedHeight(that.positions, that.height),
        1 == that.positions.length && that.createPolygonEntity(),
          that.createVertex()
      );
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 右击事件
   */
  rightClickEvent() {
    var that = this;
    this.handler.setInputAction(function (e) {
      !that.isMeasure || that.positions.length < 3 ? (that.deactivate(), that.clear()) :
        (
          that.tempPositions = [].concat(that.positions),
            that.polygonEntity.polyline = {
              'positions': that.positions.concat(that.positions[0]),
              'width': 2,
              'material': Cesium.Color.YELLOW,
              'depthFailMaterial': new Cesium.PolylineDashMaterialProperty({
                'color': Cesium.Color.YELLOW
              })
            },
            that.polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(that.tempPositions),
            that.mesureResultEntity.position = that.getCenterPosition(),
            that.mesureResultEntity.label.text = '总面积' + that.getArea(that.positions) + '平方米',
            that.measureEnd());
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  /**
   * 鼠标移动事件
   */
  mouseMoveEvent() {
    var that = this;
    this.handler.setInputAction(function (movement) {
      var pos;
      that.isMeasure && (that.viewer._element.style.cursor = 'crosshair',
        (
          pos = (pos = that.viewer.scene.pickPosition(movement.endPosition)) || that.viewer.scene.camera.pickEllipsoid(movement.startPosition, that.viewer.scene.globe.ellipsoid)) && that.handleMoveEvent(pos)
      );

      // 提示框随鼠标移动
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
   * 处理鼠标移动坐标
   */
  handleMoveEvent(pos) {
    this.positions.length < 1 ||
    (
      this.height = this.unifiedHeight(this.positions, this.height),
        this.tempPositions = this.positions.concat(pos),
      3 <= this.tempPositions.length && !this.mesureResultEntity && this.createResultLabel()
    );
  }

  /**
   * 获取高度
   */
  unifiedHeight(position, height) {
    var height = height || this.getPositionHeight(position[0]);
    for (var i = 0; i < position.length; i++) {
      var p = position[i],
        pos = this.cartesian3ToPoint3D(p);
      position[i] = Cesium.Cartesian3.fromDegrees(pos.x, pos.y, height);
    }
    return height;
  }

  /**
   * 根据坐标获取高度
   */
  getPositionHeight(position) {
    return Cesium.Cartographic.fromCartesian(position).height;
  }

  /**
   * 坐标转换
   */
  cartesian3ToPoint3D(position) {
    return position = Cesium.Cartographic.fromCartesian(position), {
      'x': Cesium.Math.toDegrees(position.longitude),
      'y': Cesium.Math.toDegrees(position.latitude),
      'z': position.height
    };
  }

  /**
   * 经纬度转平面坐标
   */
  rotatePlane(position) {
    return position = Cesium.Cartographic.fromCartesian(position), [Cesium.Math.toDegrees(position.longitude), Cesium.Math.toDegrees(position.latitude)];
  }

  /**
   * 利用turf计算面积
   */
  getArea(positions) {
    if (positions.length < 3) {
      return 0
    }
    
    var pointArr = [];
    var that = this;
    return positions.forEach(function (position) {
      pointArr.push(that.rotatePlane(position));
    }),
      pointArr.push(pointArr[0]),
      positions = turf.polygon([pointArr]),
      turf.area(positions).toFixed(2);
  }

  /**
   * 激活
   */
  activate() {
    this.deactivate(),
      this.registerEvents(),
      this.viewer.enableCursorStyle = false,
      this.viewer._element.style.cursor = 'crosshair',
      this.isMeasure = true,
      this.measureArea = 0;
  }

  /**
   * 结束绘制
   */
  measureEnd() {
    this.deactivate(),
      this.MeasureEndEvent.raiseEvent(this.measureArea);
  }

  /**
   * 注销事件
   */
  unRegisterEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 注销
   */
  deactivate() {
    this.isMeasure && (
      this.unRegisterEvents(),
        this.hideTooltip(),
        this.viewer._element.style.cursor = 'default',
        this.viewer.enableCursorStyle = true,
        this.isMeasure = false,
        this.tempPositions = [],
        this.positions = [],
        this.height = undefined
    );
  }

  /**
   * 清除
   */
  clear() {
    var that = this;
    this.viewer.entities.remove(this.polygonEntity),
      this.polygonEntity = undefined,
      this.vertexEntities.forEach(function (entity) {
        that.viewer.entities.remove(entity);
      }),
      this.vertexEntities = [],
      this.viewer.entities.remove(this.mesureResultEntity),
      this.mesureResultEntity = undefined,
      this.height = undefined;
  }

  // 绘制结束，删除提示框
  hideTooltip() {
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom && document.body.removeChild(vcTooltipDom)
  }


}
