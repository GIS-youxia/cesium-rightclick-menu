import styleInit from '../../utils/styleInit.js';

export default class Fh {

  /**
   * @param {Object} viewer
   * @param {Object} fh 分栋对象，一般传geoserver wfs请求的json数据,分户建立在分层的基础上
   */
  constructor(viewer, fh) {
    this.viewer = viewer,
      this.fhPrimitives = [],
      this.fcDataServerBaseUrl = fh.fcDataServerBaseUrl,
      this.fhDataServerBaseUrl = fh.fhDataServerBaseUrl,
      this.HouseSelectedEvent = new Cesium.Event(),
      this.initEvents();
    this.setStyle();
  }

  /**
   * 注册事件
   */
  initEvents() {
    var that = this;
    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function (e) {
      if (that.isActivate) {
        var property = that.viewer.scene.pick(e.position);
        if (property) {
          if (property.primitive && property.primitive instanceof Cesium.ClassificationPrimitive)
            return void that.handlePickHouse(property);
          if (property.id && 'highlightFloorEntity' == property.id.type)
            return;
        }
        property = that.viewer.scene.pickPosition(e.position),
        property && (e = Cesium.Cartographic.fromCartesian(property),
          property = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)],
          that.queryByPoint(property, e.height));
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 查询点
   */
  queryByPoint(fcDataServerBaseUrl, height) {
    var that = this;
    this.mouseClickHeight = height,
      fcDataServerBaseUrl = this.fcDataServerBaseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + fcDataServerBaseUrl[0] + ',' + fcDataServerBaseUrl[1] + '</gml:coordinates></gml:Point></Intersects></Filter>',
      fetch(fcDataServerBaseUrl).then(function (res) {
        return res.json();
      }).then(function (res) {
        that.handleFcQueryResult(res);
      }).catch(function (error) {
        console.log(error);
      });
  }

  /**
   * 处理查询结果
   */
  handleFcQueryResult(res) {
    if (this.clearPrimitives(), this.HouseSelectedEvent.raiseEvent(void 0), !(res.features.length < 1)) {
      for (var _0x30f348, _0x38c1d3, _0x1c0a81 = void 0, i = 0; i < res.features.length; i++) {
        var feature = res.features[i];
        if (this.mouseClickHeight >= feature.properties.BaseHeight && this.mouseClickHeight <= feature.properties.TopHeight) {
          _0x1c0a81 = feature;
          break;
        }
      }
      console.log(_0x1c0a81)
      _0x1c0a81 && (_0x30f348 = _0x1c0a81.properties.BuildCode,
        _0x38c1d3 = _0x1c0a81.properties.FloorNumbe,
        this.queryBySQL(_0x30f348, _0x38c1d3));
    }
  }

  /**
   * SQL查询
   */
  queryBySQL(id, url) {
    var that = this, url = this.fhDataServerBaseUrl + '&cql_filter=BuildCode=' + id + '\x20and\x20FloorNumbe=' + url;
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (res) {
      console.log(res)
      that.handleFhQueryResult(res);
    }).catch(function (error) {
      console.log(error);
    });
  }

  /**
   * 处理分户查询结果
   */
  handleFhQueryResult(res) {
    var that = this;
    res.features.length < 1 ||
    (
      this.queryResultFeatures = res.features,
        res.features.forEach(function (e) {
          console.log(e)
          that.addPrimitive(e);
        })
    );
  }

  /**
   * 添加primitive对象
   */
  addPrimitive(primitive) {
    console.log(primitive)
    var propety = primitive.properties;
    primitive = turf.buffer(primitive, 0.8, {
      'units': 'meters'
    }),
      (primitive = this.getDegreesArrayHeights(primitive),
        primitive = new Cesium.PolygonGeometry({
          'polygonHierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(primitive)),
          'perPositionHeight': true,
          'extrudedHeight': propety.BaseHeight + propety.FloorHeigh
        }),
        propety = propety.BuildCode + propety.FloorNumbe + propety.HouseCode,
        primitive = this.createExtrudedPolygon(propety, primitive)),
      this.fhPrimitives.push(primitive);
  }

  /**
   * 清除primitive对象
   */
  clearPrimitives() {
    var that = this;
    this.fhPrimitives.forEach(function (primitive) {
      that.viewer.scene.primitives.remove(primitive);
    }),
      this.fhPrimitives = [],
      this.viewer.entities.remove(this.highlightFloorEntity);
  }

  /**
   * 创建突出面
   */
  createExtrudedPolygon(id, geometry) {
    return this.viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
      'geometryInstances': new Cesium.GeometryInstance({
        'geometry': Cesium.PolygonGeometry.createGeometry(geometry),
        'attributes': {
          'color': Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
            'alpha': 0.8
          })),
          'show': new Cesium.ShowGeometryInstanceAttribute(true)
        },
        'id': id
      }),
      'classificationType': Cesium.ClassificationType.CESIUM_3D_TILE
    }));
  }

  /**
   * 获取坐标数组高度数组
   */
  getDegreesArrayHeights(feature) {
    var heightArr = []
    var coordinateArr = void 0;
    'MultiPolygon' == feature.geometry.type ? coordinateArr = feature.geometry.coordinates[0][0] : 'Polygon' == feature.geometry.type && (coordinateArr = feature.geometry.coordinates[0]);
    for (var i = 0; i < coordinateArr.length; i++) {
      var point = coordinateArr[i];
      heightArr.push(point[0]),
        heightArr.push(point[1]),
        heightArr.push(feature.properties.BaseHeight);
    }
    return heightArr;
  }

  /**
   * 获取拾取或点击的对象
   */
  handlePickHouse(pickObj) {
    this.clickHighlightPrimitive && (this.clickHighlightPrimitive.show = true),
      pickObj.primitive.show = false,
      this.clickHighlightPrimitive = pickObj.primitive;
    var feature = this.getFeatureByPrimitiveId(pickObj.id);
    this.HouseSelectedEvent.raiseEvent(feature),
      feature = turf.buffer(feature, 1, {
        'units': 'meters'
      }),
      this.viewer.entities.remove(this.highlightFloorEntity),
      pickObj = this.getDegreesArrayHeights(feature),
      this.highlightFloorEntity = this.viewer.entities.add({
        'type': 'highlightFloorEntity',
        'polygon': {
          'hierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pickObj)),
          'perPositionHeight': true,
          'extrudedHeight': feature.properties.BaseHeight + feature.properties.FloorHeigh,
          'material': Cesium.Color.RED.withAlpha(0.7)
        }
      });
  }

  /**
   * 通过id查询feature
   */
  getFeatureByPrimitiveId(feature) {
    for (var i = 0; i < this.queryResultFeatures.length; i++) {
      var properties = this.queryResultFeatures[i].properties;
      if (properties.BuildCode + properties.FloorNumbe + properties.HouseCode == feature)
        return this.queryResultFeatures[i];
    }
  }

  /**
   * 注册样式
   */
  setStyle() {
    var style = '.MultiFieldAdaptWindow-container {position: absolute;left: 0px;bottom: 0px;min-width: 350px;min-height: 200px;color: white;}.MultiFieldAdaptWindow-container::before {position: absolute;content: "";top: 100%;left: calc(50% - 20px);border: 20px solid transparent;border-top: 40px solid rgba(30, 32, 42, 0.5);}.MultiFieldAdaptWindow-header {height: 30px;line-height: 30px;color: white;min-width: 200px;padding: 0px 10px;background: #1a4879;border-top-right-radius: 4px;border-top-left-radius: 4px;position: relative;user-select: none;}.MultiFieldAdaptWindow-close {position: absolute;right: 1px;font-size: 25px;cursor: pointer;width: 29px;text-align: center;}.MultiFieldAdaptWindow-close:hover {background: #dc2929b9;}.MultiFieldAdaptWindow-body {padding: 5px;background: linear-gradient( 0deg, rgba(30, 32, 42, 0.5), rgba(13, 16, 19, 0.7));border: 1px solid rgb(29, 26, 26);border-top: 0px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.MultiFieldAdaptWindow-info-item {margin: 14px 0px;max-width: 350px;}.MultiFieldAdaptWindow-ifno-label {display: inline-block;min-width: 60px;text-align: justify;text-align-last: justify;background: #fff6f625;}.MultiFieldAdaptWindow-ifno-text {background: #fff6f60e;}'
    new styleInit(style, {})
  }

  activate() {
    this.isActivate = true;
  }

  deactivate() {
    this.isActivate = false;
  }


}
