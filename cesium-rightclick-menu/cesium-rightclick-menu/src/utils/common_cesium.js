
/**
 * @name: common_cesium
 * @author: wangwei
 * @date: 2022/9/22 16:56
 * @description：common_cesium
 * @update: 2022/9/22 16:56
 */

import {dataURLtoBlob} from "./common_tools";
// import colors from '../components/comprehensiveMap/colors.json'
import Vue from "vue";

/**
 * 世界坐标转为经纬度坐标
 * @param cartesian2
 * @param viewer
 * @returns {{lng: number, lat: number}}
 */
function cartesian2ToXyz(cartesian2, viewer) {
  const cartesian = viewer.scene.globe.pick(window.viewer.camera.getPickRay(cartesian2), viewer.scene);
  const ellipsoid = viewer.scene.globe.ellipsoid;
  const cartographic = ellipsoid.cartesianToCartographic(cartesian);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  const lng = Cesium.Math.toDegrees(cartographic.longitude);
  return {
    lat, lng
  }
}

/**
 * cartesian3 -> Xyz
 * @param cartesian3
 * @param viewer
 * @returns {{lng: number, lat: number}}
 */
function cartesian3ToXyz(cartesian3, viewer) {
  const ellipsoid = viewer.scene.globe.ellipsoid;
  const cartographic = ellipsoid.cartesianToCartographic(cartesian3);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  const lng = Cesium.Math.toDegrees(cartographic.longitude);
  // const alt = cartographic.height;
  return {
    lat, lng
  }
}


/**
 * 场景出图
 * @param viewer
 */
function sceneToFile(viewer) {
  let canvas = viewer.scene.canvas;
  let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  let link = document.createElement("a");
  let blob = dataURLtoBlob(image);
  let url = URL.createObjectURL(blob);
  link.download = "scene.png";
  link.href = url;
  link.click();
}


/**
 * 定位到坐标点 返回参数
 * @param lng
 * @param lat
 * @param height
 * @returns {{orientation: {heading: number, roll: number, pitch: number}, destination: {x: number, y: number, z: number}}}
 */
function toCenter(lng, lat, height) {
  let pos = Cesium.Cartesian3.fromDegrees(lng, lat, height)//经纬度坐标转化为投影坐标
  return {
    destination: {
      x: pos.x,
      y: pos.y,
      z: pos.z
    },
    // orientation: {
    //   heading: 0,
    //   pitch: -1,
    //   roll: 6.279943661313574
    // }
  }
}

/**
 * 一张图页面
 * 加载面
 * @param url 地址
 * @param zbList
 */
function loadRegions(url, zbList) {
  window.viewer.entities.removeAll()
  fetch(url).then(res => {
    return res.json();
  }).then(res => {
    let features = res.features;
    features.forEach((item) => {
      addRegion(item);
    });

    zbList.forEach(item => {
      let entity = window.viewer.entities.getById(item.landId)
      // entity.polygon.material = Cesium.Color.fromCssColorString(getColor(item.landColor))

      entity.label = getLabelObj(item.landLable)
      entity.canShow = true
      entity.propertiesObj = item
    })
  })
}

/**
 * 首页加载面
 * @param args
 */
function loadRegions4Index(args) {
  const loading = Vue.prototype.$loading({
    lock: true,
    text: '图层加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  fetch(args.resourcesUrl).then(res => {
    return res.json()
  }).then(res => {
    let features = res.features

    features.forEach((item, index) => {
      addRegion4Index(item, index, args)
    });

    let flag = false

    let so = setTimeout(() => {
      loading.close()
      flag = true
    }, 800)

    flag && clearTimeout(so)
  })
}

/**
 * 首页加载图层
 * @param feature
 * @param index
 * @param args
 */
function addRegion4Index(feature, index, args) {
  if (feature) {
    let cp = feature.geometry.coordinates[0][0][0]
    let position = Cesium.Cartesian3.fromDegrees(...cp)
    let featureCollection = feature.geometry
    var posArr = []
    var pointArr = []
    'MultiPolygon' === featureCollection.type ?
      posArr = featureCollection.coordinates[0][0] : 'Polygon' === featureCollection.type
      && (posArr = featureCollection.coordinates[0])
    for (var i = 0; i < posArr.length; i++) {
      var p = posArr[i]
      pointArr.push(p[0])
      pointArr.push(p[1])
      pointArr.push(0)
    }
    addClampFeature4Index(pointArr, feature.properties, position, index, args)
  }
}

function addClampFeature4Index(pointArr, properties, position, index, args) {
  let et = window.viewer.entities.add({
    id: args.label + index.toString(),
    name: args.label,
    position: position,
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)),
      classificationType: Cesium.ClassificationType.BOTH,
      material: Cesium.Color.fromCssColorString(args.tcColor).withAlpha(args.alpha / 100),
      zIndex: 10
    },
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr),
      width: 2,
      clampToGround: true,
      material: Cesium.Color.YELLOW
    }
  })
  window.viewer.zoomTo(et)
}

function getLabelObj(label) {
  return {
    text: label,
    style: Cesium.LabelStyle.FILL,
    fillColor: Cesium.Color.fromCssColorString('#090909'),
    // outlineColor: Cesium.Color.fromCssColorString('#ffffff'),
    // outlineWidth: 10,
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
    font: '22pt',
    showBackground: false,
    scale: 0.65,
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
    verticalOrigin: Cesium.VerticalOrigin.TOP,
    disableDepthTestDistance: 10000.0
  }
}

function addRegion(feature) {
  if (feature) {
    let cp = feature.geometry.coordinates[0][0][0]
    let center = turf.center(feature);
    let point = center.geometry.coordinates;
    let position = Cesium.Cartesian3.fromDegrees(...cp);
    let position1 = Cesium.Cartesian3.fromDegrees(...point);
    let fid = feature.id
    // let colorValue = getColor(feature.properties.autocad_co)
    let featureCollection = feature.geometry
    var posArr = []
    var pointArr = []
    'MultiPolygon' === featureCollection.type ?
      posArr = featureCollection.coordinates[0][0] : 'Polygon' === featureCollection.type
      && (posArr = featureCollection.coordinates[0])
    for (var i = 0; i < posArr.length; i++) {
      var p = posArr[i]
      pointArr.push(p[0])
      pointArr.push(p[1])
      pointArr.push(0)
    }
    addClampFeature(pointArr, fid, feature.properties, position, position1)
  }
}

// function getColor(key) {
//   let obj = colors.find(f => f.key === key.toString())
//   return obj.value
// }

function addClampFeature(pointArr, fid, properties, position, position1) {
  let entity = window.viewer.entities.add({
    id: fid,
    name: properties.lable,
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)),
      classificationType: Cesium.ClassificationType.BOTH,
      material: Cesium.Color.GRAY,
      zIndex: 10
      // material: Cesium.Color.fromCssColorString(colorValue),
    },
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr),
      width: 2,
      clampToGround: true,
      material: Cesium.Color.YELLOW,
    }
  })

  var value = [];
  var center;
  var a = 0;
  var b = 0;
  for (var j = 0; j <= entity.polygon._hierarchy._value.positions.length - 1; j++) {
    value[j] = [entity.polygon._hierarchy._value.positions[j].x, entity.polygon._hierarchy._value.positions[j].y];
    a = entity.polygon._hierarchy._value.positions[j].z;
    b = b + a;
  }

  var polygon = turf.polygon([value]);
  var centroid = turf.centroid(polygon);
  center = [centroid.geometry.coordinates[0], centroid.geometry.coordinates[1], b / entity.polygon._hierarchy._value.positions.length + 2000];
  // const labelpostion = Cesium.Cartesian3.fromArray(center);
  let point = turf.point(center)
  let boo = turf.booleanPointInPolygon(point, polygon)
  let cp
  boo ? cp = position1 : cp = position
  entity.position = cp
}

/**
 * 给一个实体添加标签
 * @param entity 实体对象
 * @param type 实体类型
 * @param labelText 要展示的标签文字
 */
function addLabelText(entity, type = '', labelText) {
  if (type === 'Polygon') {
    const polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
    let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
    polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
    window.viewer.entities.add({
      id: 'Polygon_Label',
      position: polyCenter,
      label: {
        text: labelText,
        font: '500 18px monospace',
        fillColor: Cesium.Color.AQUA,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
    })
  } else {
    entity.label = {
      text: labelText,
      font: '600 18px monospace',
      color: Cesium.Color.AQUA,
      fillColor: Cesium.Color.AQUA,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      pixelOffset: new Cesium.Cartesian2(0,-15)
    }
  }
}

/**
 * 加载3d模型
 * @param url 模型地址
 * @returns {any} 模型实体
 */
function load3DTiles(url) {
  const loading = Vue.prototype.$loading({
    lock: true,
    text: '模型加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  let tiles = window.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: url,
    skipLevelOfDetail: true,
    preferLeaves: true,
    baseScreenSpaceError: 1024,
    skipScreenSpaceErrorFactor: 16,
    skipLevels: 1,
    immediatelyLoadDesiredLevelOfDetail: false,
    loadSiblings: false,
    cullWithChildrenBounds: true,
    dynamicScreenSpaceError: true,
    dynamicScreenSpaceErrorDensity: 0.00278,
    dynamicScreenSpaceErrorFactor: 4.0,
    dynamicScreenSpaceErrorHeightFalloff: 0.25,
    maximumMemoryUsage: 1024,
  }))

  window.viewer.zoomTo(tiles)

  tiles.setViewTo = (tile) => {
    window.viewer.zoomTo(tile)
  }

  let flag = false
  let timer = setInterval(() => {
    if (tiles.tilesLoaded) {
      loading.close()
      flag = true
    }
  }, 100)

  flag && clearInterval(timer)

  return tiles
}

export {
  cartesian2ToXyz,
  sceneToFile,
  cartesian3ToXyz,
  toCenter,
  loadRegions,
  loadRegions4Index,
  // getColor,
  getLabelObj,
  addLabelText,
  load3DTiles
}
