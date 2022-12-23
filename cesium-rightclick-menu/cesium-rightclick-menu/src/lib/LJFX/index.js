import axios from "axios"

const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323
let start = null
let end = null
export default class searchRoute {
    constructor(viewer) {
        this.viewer = viewer
        this.startP = null
        this.endP = null
        this.lineEntity = null
        this.initEvents()
    }

    initEvents() {
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        let isClickAgain = false
        // let start = null
        // let end = null
        handler.setInputAction((evt) => {
            let cartesian = this.getCatesian3FromPX(evt.position, this.viewer)
            if (!isClickAgain) {
                isClickAgain = true
                start = this.viewer.entities.add({
                    name: "图标点",
                    position: cartesian, billboard: {
                        image: 'http://120.27.230.6/tjch/cesium/resource/img/locate.png',
                        scale: 1,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    }
                })
                return
            }
            if (isClickAgain) {
                end = this.viewer.entities.add({
                    name: "图标点",
                    position: cartesian, billboard: {
                        image: 'http://120.27.230.6/tjch/cesium/resource/img/locate.png',
                        scale: 1,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    }
                })
                this.showRes(start.position.getValue(), end.position.getValue())
                handler.destroy()
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    showRes(start, end) {
        if (!start || !end) return
        this.startP = this.cartesianToLnglat(start, true)
        this.endP = this.cartesianToLnglat(end, true)
        this.start({
            strategy: 11,
            callback: data => {
                this.addRouteLine(data[0])
            }
        })
    }

    addRouteLine(res) {
        const arr = []
        const steps = res.steps
        for (let i = 0; i < steps.length; i++) {
            const item = steps[i]
            const positionStr = item.polyline
            const strArr = positionStr.split(";")
            for (let z = 0; z < strArr.length; z++) {
                const item2 = strArr[z]
                const strArr2 = item2.split(",")
                const p = this.gcj2wgs(strArr2)
                arr.push(p)
            }
        }
        const cartesians = this.lnglatArrToCartesianArr(arr)
        this.lineEntity = this.viewer.entities.add({
            polyline: {
                positions: cartesians, clampToGround: true, material: Cesium.Color.RED.withAlpha(1), width: 3
            }
        })
    }

    start(opt) {
        let startP = this.wgs2gcj(this.startP)
        let endP = this.wgs2gcj(this.endP)
        /**
         * 0：速度优先（只返回一条路线），此路线不一定距离最短
         * 1：费用优先（只返回一条路线），不走收费路段，且耗时最少的路线
         * 2：距离优先（只返回一条路线），仅走距离最短的路线，但是可能存在穿越小路/小区的情况
         * 3：速度优先（只返回一条路线），不走快速路，例如京通快速路
         * 32：默认，高德推荐，同高德地图APP默认
         * 33：躲避拥堵
         * 34：高速优先
         * 35：不走高速
         * 36：少收费
         * 37：大路优先
         * 38：速度最快
         * 39：躲避拥堵＋高速优先
         * 40：躲避拥堵＋不走高速
         * 41：躲避拥堵＋少收费
         * 42：少收费＋不走高速
         * 43：躲避拥堵＋少收费＋不走高速
         * 44：躲避拥堵＋大路优先
         * 45：躲避拥堵＋速度最快
         */
        axios({
            url: "http://restapi.amap.com/v3/direction/driving",
            methods: "GET",
            timeout: "5000",
            contentType: "application/json;utf-8",
            params: {
                "output": "json",
                "extensions": "all",
                "key": "e7307b8a3b936829414ab022fab0a916",
                "origin": startP[0] + "," + startP[1],
                "destination": endP[0] + "," + endP[1],
                "strategy": 2 // opt.strategy || 10
            }
        }).then(json => {
            // 由于线涉及坐标较多 此处返回的坐标 未转为wgs84
            let data = ""
            if (!json.data.route.paths) {
                data = ""
            } else {
                data = json.data.route.paths
            }
            opt.callback(data)
        })
    }

    remove(){
        if (this.lineEntity) {
            this.viewer.entities.remove(this.lineEntity)
            this.viewer.entities.remove(start)
            this.viewer.entities.remove(end)
        }
    }

    cartesianToLnglat(cartesian, isToWgs84) {
        if (!cartesian) return
        var ellipsoid = this.viewer.scene.globe.ellipsoid
        var lnglat = ellipsoid.cartesianToCartographic(cartesian)
        if (isToWgs84) {
            var lat = Cesium.Math.toDegrees(lnglat.latitude)
            var lng = Cesium.Math.toDegrees(lnglat.longitude)
            var hei = lnglat.height
            return [lng, lat, hei]
        } else {
            return [lnglat.longitude, lnglat.latitude, lnglat.height]
        }

    }

    lnglatToCartesian(lnglat) { //经纬度转世界坐标 [101,40]
        if (!lnglat) return null;
        return Cesium.Cartesian3.fromDegrees(lnglat[0], lnglat[1], lnglat[2] || 0);
    }

    lnglatArrToCartesianArr(lnglatArr) {
        if (!lnglatArr) return [];
        var arr = [];
        for (var i = 0; i < lnglatArr.length; i++) {
            arr.push(this.lnglatToCartesian(lnglatArr[i]));
        }
        return arr;
    }

    getCatesian3FromPX(px, viewer, entity) {
        var pick = viewer.scene.pick(px);
        var cartesian;
        var drillPick = viewer.scene.drillPick(px);
        var truePick = null;
        if (entity) {
            for (var i = 0; i < drillPick.length; i++) {
                if (drillPick[i].id._id != entity.id) {
                    truePick = drillPick[i].id;
                    break;
                }
            }
        } else {
            truePick = pick;
        }
        if (viewer.scene.pickPositionSupported && Cesium.defined(truePick)) {
            cartesian = viewer.scene.pickPosition(px);
        } else {
            var ray = viewer.camera.getPickRay(px);
            if (!ray) return;
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        }
        return cartesian;
    }


// var qicheModel = null;
// function moveOnRoute(lineEntity) {
//     if (!lineEntity) return;
//     var positions = lineEntity.polyline.positions.getValue();
//     if (!positions) return;
//     var allDis = 0;
//     for (var index = 0; index < positions.length - 1; index++) {
//         var dis = Cesium.Cartesian3.distance(positions[index], positions[index + 1]);
//         allDis += dis;
//     }
//     var playTime = 100;
//     var v = allDis / playTime;
//     var startTime = viewer.clock.currentTime;
//     var endTime = Cesium.JulianDate.addSeconds(startTime, playTime, new Cesium.JulianDate());
//     var property = new Cesium.SampledPositionProperty();
//     var t = 0;
//     for (var i = 1; i < positions.length; i++) {
//         if (i == 1) {
//             property.addSample(startTime, positions[0]);
//         }
//         var dis = Cesium.Cartesian3.distance(positions[i], positions[i - 1]);
//         var time = dis / v + t;
//         var julianDate = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
//         property.addSample(julianDate, positions[i]);
//         t += dis / v;
//     }
//     if (qicheModel) {
//         window.viewer.entities.remove(qicheModel);
//         qicheModel = null;
//     }
//     qicheModel = viewer.entities.add({
//         position: property,
//         orientation: new Cesium.VelocityOrientationProperty(property),
//         model: {
//             uri: "car.glb",
//             scale: 30
//         }
//     });
//     viewer.clock.currentTime = startTime;
//     viewer.clock.multiplier = 1;
//     viewer.clock.shouldAnimate = true;
//     viewer.clock.stopTime = endTime;
// }

//坐标转换==================================

    transformWD(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    transformJD(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret;
    }

    wgs2gcj(arrdata) {
        var lng = Number(arrdata[0]);
        var lat = Number(arrdata[1]);
        var dlat = this.transformWD(lng - 105.0, lat - 35.0);
        var dlng = this.transformJD(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
        dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;

        mglng = Number(mglng.toFixed(6));
        mglat = Number(mglat.toFixed(6));
        return [mglng, mglat];

    };

    gcj2wgs(arrdata) {
        var lng = Number(arrdata[0]);
        var lat = Number(arrdata[1]);
        var dlat = this.transformWD(lng - 105.0, lat - 35.0);
        var dlng = this.transformJD(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
        dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);

        var mglat = lat + dlat;
        var mglng = lng + dlng;

        var jd = lng * 2 - mglng;
        var wd = lat * 2 - mglat;

        jd = Number(jd.toFixed(6));
        wd = Number(wd.toFixed(6));
        return [jd, wd];
    }

}
