export default class Fd {

  /**
   * @param {Object} viewer
   * @param {Object} fd 分栋对象，一般传geoserver wfs请求的json数据
   */
  constructor(viewer, fd, position) {
    this.viewer = viewer,
      this.mouseClickPosition = void 0,
      this.fdDataServerBaseUrl = fd.fdDataServerBaseUrl,
      this.BuildingSelectedEvent = new Cesium.Event(),
      this.position = position,
      this.fid = undefined,
      this.initEvents();
  }

  /**
   * 注册事件
   */
  initEvents() {
    var that = this;
    if (that.position == null) {
      new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas).setInputAction(function (movenment) {
        that.isActivate && (that.BuildingSelectedEvent.raiseEvent(void 0),
          (movenment = that.viewer.scene.pickPosition(movenment.position)) && (that.mouseClickPosition = movenment,
            movenment = Cesium.Cartographic.fromCartesian(movenment),
            movenment = [Cesium.Math.toDegrees(movenment.longitude),
              Cesium.Math.toDegrees(movenment.latitude)],
            that.queryByPoint(movenment))
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    } else {
      that.queryByPoint(that.position, 1);
    }
  }

  /**
   * 查询点
   */
  queryByPoint(position, flag) {
    console.log(position);
    var that = this
    var url = this.fdDataServerBaseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (res) {
      // if (res.totalFeatures) {
      that.handleQueryResult(res, flag, position);
      // } else {
      // that.getFysqfw(position, flag)
      // }
    }).catch(function (error) {
      console.log(error);
    });
  }

  /**
   * 不是单栋的情况
   * 查询防疫三区范围面
   */
  // getFysqfw(position, flag) {
  //   const that = this;
  //   const baseUrl = 'http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Afysqfw&maxFeatures=5000&outputFormat=application%2Fjson'
  //   const url = baseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
  //   fetch(url).then(function (data) {
  //     return data.json();
  //   }).then(function (res) {
  //     console.log(res, 'mmmmm');
  //     // that.handleQueryResult(res, flag);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }

  /**
   * 处理查询结果
   */
  handleQueryResult(featureCollection, flag, position) {

    const baseUrl = 'http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Afysqfw&maxFeatures=5000&outputFormat=application%2Fjson'
    const url = baseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';

    let _this = this
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (res) {
      // 该房屋所在防控范围
      let allType = []
      let areaTypeColor = ''
      res.features.forEach(item => {
        allType.push(item.properties.type)
      })
      if (allType.length && allType.indexOf('封控区') > -1) {
        areaTypeColor = 'RED'
      } else if (allType.indexOf('管控区') > -1) {
        areaTypeColor = 'ORANGE'
      } else if (allType.indexOf('防范区') > -1) {
        areaTypeColor = 'YELLOW'
      } else {
        areaTypeColor = 'CYAN'
      }

      // _this.clearQueryResult();
      let feature = featureCollection.features[0];
      if (feature) {
        let et = window.viewer.entities.getById('dth' + feature.id)

        if (et) {
          // 已经存在就删除
          window.viewer.entities.remove(et)
        } else {
          _this.fid = feature.id
          featureCollection = feature.geometry,
            feature = feature.properties,
            _this.BuildingSelectedEvent.raiseEvent(feature, _this.mouseClickPosition);
          let posArr = [];
          const pointArr = [];
          'MultiPolygon' === featureCollection.type ?
            posArr = featureCollection.coordinates[0][0] : 'Polygon' == featureCollection.type
            && (posArr = featureCollection.coordinates[0]);
          for (let i = 0; i < posArr.length; i++) {
            const p = posArr[i]
            pointArr.push(p[0])
            pointArr.push(p[1])
            pointArr.push(0)
          }
          _this.addClampFeature(pointArr, flag, areaTypeColor);
        }
      }
    })
  }

  /**
   * 添加数据
   * 传个颜色 动态房屋颜色
   */
  addClampFeature(pointArr, flag, areaTypeColor) {
    this.clampFeature = this.viewer.entities.add({
      id: 'dth' + this.fid,
      'polygon': {
        'hierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)),
        'classificationType': Cesium.ClassificationType.CESIUM_3D_TILE,
        'material': Cesium.Color[areaTypeColor].withAlpha(0.5)
      }
    })
    //如果是查询就定位
    if (flag == 1) {
      window.viewer.flyTo(this.clampFeature, {
        duration: 1.5,
        offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90.0), 10)
      })
    }
  }

  /**
   * 清除数据
   */
  clearQueryResult() {
    if (this.clampFeature) {
      this.viewer.entities.remove(this.clampFeature);
      this.clampFeature = {}
    }
    // this.clampFeature && (this.viewer.entities.remove(this.clampFeature),this.clampFeature = void 0);
  }

  activate() {
    this.isActivate = true;
  }

  deactivate() {
    this.isActivate = false;
  }

}
