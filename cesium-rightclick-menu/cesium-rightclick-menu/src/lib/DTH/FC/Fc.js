import styleInit  from '../../utils/styleInit.js';

export default class Fc{

  /**
   * @param {Object} viewer
   * @param {Object} fc 分栋对象，一般传geoserver wfs请求的json数据
   */
  constructor(viewer,fc){
    this.viewer = viewer,
    this.fcPrimitives = [],
    this.fcDataServerBaseUrl = fc.fcDataServerBaseUrl,
    this.FloorSelectedEvent = new Cesium.Event(),
    this.initEvents();
  }
	/**
	 * 注册事件
	 */
	initEvents(){
		var that = this;
		new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas).setInputAction(function(pick) {
		  if (that.isActivate) {
		    that.FloorSelectedEvent.raiseEvent(void 0);
		    var property = that.viewer.scene.pick(pick.position);
		    if (property) {
          if (property.primitive && property.primitive instanceof Cesium.ClassificationPrimitive)
            return void that.handlePickFloor(property);
          if (property.id && 'highlightFloorEntity' == property.id.type)
            return;
		    }
		    pick = that.viewer.scene.pickPosition(pick.position),
		    pick && (pick = Cesium.Cartographic.fromCartesian(pick),
		    pick = [Cesium.Math.toDegrees(pick.longitude), Cesium.Math.toDegrees(pick.latitude)],
		    that.queryByPoint(pick));
		  }
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	/**
	 * 查询点
	 */
	queryByPoint(position){
		var that = this
		var fcDataServerBaseUrl = this.fcDataServerBaseUrl + '&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
    fetch(fcDataServerBaseUrl).then(function(res) {
		    return res.json();
		}).then(function(res) {
		    that.handleQueryResult(res);
		}).catch(function(error) {
		  console.log(error);
		});
	}

  /**
	 * 处理查询结果
	 */
	handleQueryResult(result){
		var that = this;
		that.clearPrimitives(),
		result.features.length < 1 || (that.queryResultFeatures = result.features,
		result.features.forEach(function(primitive) {
		  that.addPrimitive(primitive);
		}));
	}

  /**
   * 添加primitive
   */
  addPrimitive(primitive){
    var property = primitive.properties;
    primitive = turf.buffer(primitive, 0.8, {
      'units': 'meters'
    }),
    (primitive = this.getDegreesArrayHeights(primitive),
    primitive = new Cesium.PolygonGeometry({
        'polygonHierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(primitive)),
        'perPositionHeight': true,
        'extrudedHeight': property.BaseHeight + property.FloorHeigh
    }),
    property = property.BuildCode + property.FloorNumbe,
    primitive = this.createExtrudedPolygon(property, primitive)),
    this.fcPrimitives.push(primitive);
  }

  /**
   * 清除primitive
   */
  clearPrimitives(){
    var that = this;
    this.fcPrimitives.forEach(function(primitive) {
        that.viewer.scene.primitives.remove(primitive);
    }),
    this.fcPrimitives = [],
    this.viewer.entities.remove(this.highlightFloorEntity);
  }

  /**
   * 创建突出面
   */
  createExtrudedPolygon(id, geometry){
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
   * 获取坐标数组的高度数组
   */
  getDegreesArrayHeights(feature){
    var heightArr = []
      , coordinateArr = void 0;
    'MultiPolygon' == feature.geometry.type ? coordinateArr = feature.geometry.coordinates[0][0] :
    'Polygon' == feature.geometry.type && (coordinateArr = feature.geometry.coordinates[0]);
    for (var i = 0; i < coordinateArr.length; i++) {
        var coordinate = coordinateArr[i];
        heightArr.push(coordinate[0]),
        heightArr.push(coordinate[1]),
        heightArr.push(feature.properties.BaseHeight);
    }
    return heightArr;
  }

  /**
   * 处理选中结果
   */
  handlePickFloor(pickObj){
    this.clickHighlightPrimitive && (this.clickHighlightPrimitive.show = true),
    pickObj.primitive.show = false,
    this.clickHighlightPrimitive = pickObj.primitive;
    var feature = this.getFeatureByPrimitiveId(pickObj.id);
    this.FloorSelectedEvent.raiseEvent(feature),
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
   * 根据id查询feature
   */
  getFeatureByPrimitiveId(code){
    for (var i = 0; i < this.queryResultFeatures.length; i++) {
      var properties = this.queryResultFeatures[i].properties;
      if (properties.BuildCode + properties.FloorNumbe == code)
        return this.queryResultFeatures[i];
    }
  }

  /**
   * 注册样式
   */
  setStyle(){
    var style = '.MultiFieldAdaptWindow-container {position: absolute;left: 0px;bottom: 0px;min-width: 350px;min-height: 200px;color: white;}.MultiFieldAdaptWindow-container::before {position: absolute;content: "";top: 100%;left: calc(50% - 20px);border: 20px solid transparent;border-top: 40px solid rgba(30, 32, 42, 0.5);}.MultiFieldAdaptWindow-header {height: 30px;line-height: 30px;color: white;min-width: 200px;padding: 0px 10px;background: #1a4879;border-top-right-radius: 4px;border-top-left-radius: 4px;position: relative;user-select: none;}.MultiFieldAdaptWindow-close {position: absolute;right: 1px;font-size: 25px;cursor: pointer;width: 29px;text-align: center;}.MultiFieldAdaptWindow-close:hover {background: #dc2929b9;}.MultiFieldAdaptWindow-body {padding: 5px;background: linear-gradient( 0deg, rgba(30, 32, 42, 0.5), rgba(13, 16, 19, 0.7));border: 1px solid rgb(29, 26, 26);border-top: 0px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.MultiFieldAdaptWindow-info-item {margin: 14px 0px;max-width: 350px;}.MultiFieldAdaptWindow-ifno-label {display: inline-block;min-width: 60px;text-align: justify;text-align-last: justify;background: #fff6f625;}.MultiFieldAdaptWindow-ifno-text {background: #fff6f60e;}'
    styleInit(style,{})
  }

  activate(){
    this.isActivate = true;
  }

  deactivate(){
    this.isActivate = false;
  }


}
