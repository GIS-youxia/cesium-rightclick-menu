//初始化点缓冲
export function initPointBuffer() {
    let point = [106.422638966289, 29.5698367125623];
    addPoint(point);

    let pointF = turf.point(point);
    let buffered = turf.buffer(pointF, 60, {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    let points = coordinates[0];
    let degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加点
function addPoint(point) {
    window.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(point[0], point[1], 0),
        point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            outlineWidth: 3,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
        }
    })

}

//初始化线缓冲
export function initPolylineBuffer() {
    let points = [
        [106.425203158107, 29.5694914480581],
        [106.428808047023, 29.569230166027],
        [106.431661917416, 29.5692674920729],
        [106.434708906857, 29.5693048181049]
    ];
    let degreesArray = pointsToDegreesArray(points);
    addPolyline(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polylineF = turf.lineString(points);
    let buffered = turf.buffer(polylineF, 30, {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加线
function addPolyline(positions) {
    window.viewer.entities.add({
        polyline: {
            positions: positions,
            width: 2,
            material: Cesium.Color.YELLOW,
        }
    })
}

//初始化面缓冲
export function initPolygonBuffer() {
    let points = [
        [106.438549830166, 29.5701073244566],
        [106.440695597377, 29.5701073244566],
        [106.440738512722, 29.5688755679036],
        [106.438700033871, 29.5687262630581],
        [106.438034846035, 29.5690248725284],
        [106.438549830166, 29.5701073244566]
    ];

    let degreesArray = pointsToDegreesArray(points);
    addPolygon(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polygonF = turf.polygon([points]);
    let buffered = turf.buffer(polygonF, 60, {units: 'meters'});
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加面
function addPolygon(positions) {
    window.viewer.entities.add({
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
    });
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
    window.viewer.flyTo(et)
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
    initPolygonBuffer
}

