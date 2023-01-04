import {cartesian3ToXyz} from "../../utils/common_cesium";

let allBuffer = []

export function initPointBuffer(p, value) {
    let point = [p.lng, p.lat];
    addPoint(point);
    let pointF = turf.point(point);
    let buffered = turf.buffer(pointF, Number(value), {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    let points = coordinates[0];
    let degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加点
function addPoint(point) {
    let et = window.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(point[0], point[1], 0),
        point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            outlineWidth: 3,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
    })
    allBuffer.push(et)
}

//初始化线缓冲
export function initPolylineBuffer(pos, value) {
    let points = []
    pos.forEach(item => {
        let obj = cartesian3ToXyz(item, window.viewer)
        points.push([obj.lng, obj.lat])
    })

    let degreesArray = pointsToDegreesArray(points);
    addPolyline(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polylineF = turf.lineString(points);
    let buffered = turf.buffer(polylineF, Number(value), {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加线
function addPolyline(positions) {
    let et = window.viewer.entities.add({
        polyline: {
            positions: positions,
            width: 2,
            material: Cesium.Color.YELLOW,
        }
    })
    allBuffer.push(et)
}

//初始化面缓冲
export function initPolygonBuffer(pos, value) {
    let points = []
    pos.forEach(item => {
        let obj = cartesian3ToXyz(item, window.viewer)
        points.push([obj.lng, obj.lat])
    })
    points.push(points[0])

    let degreesArray = pointsToDegreesArray(points);
    addPolygon(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polygonF = turf.polygon([points]);
    let buffered = turf.buffer(polygonF, Number(value), {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加面
function addPolygon(positions) {
    let et = window.viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.YELLOW.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH
        },
        polyline: {
            positions: positions,
            width: 2,
            material: Cesium.Color.YELLOW.withAlpha(0.4),
        }
    })
    allBuffer.push(et)
}

//添加缓冲面
function addBufferPolyogn(positions) {
    let et = window.viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.RED.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH
        },
    })
    allBuffer.push(et)
    // window.viewer.flyTo(et)
}

export function clearAllBuffer() {
    allBuffer.forEach(item => {
        window.viewer.entities.remove(item)
    })
}

//格式转换
function pointsToDegreesArray(points) {
    let degreesArray = [];
    points.map(item => {
        degreesArray.push(item[0]);
        degreesArray.push(item[1]);
    });
    return degreesArray;
}

export default {
    initPolylineBuffer,
    initPointBuffer,
    initPolygonBuffer,
    clearAllBuffer
}

