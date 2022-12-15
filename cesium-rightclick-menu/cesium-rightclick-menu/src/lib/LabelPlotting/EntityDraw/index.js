import {cartesian3ToXyz} from "../../../utils/common_cesium";


export default class EntityDraw {
    constructor(viewer) {
        this.viewer = viewer;
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this.initEvents();
    }

    //激活
    activate(drawType) {
        this.deactivate();
        this.clear();
        this.drawType = drawType;
        this.positions = [];
        this.tempPositions = [];
        this.registerEvents(); //注册鼠标事件

        //设置鼠标状态
        this.viewer.enableCursorStyle = false;
        this.viewer._element.style.cursor = 'crosshair';
    }

    //禁用
    deactivate() {
        this.unRegisterEvents();
        this.drawType = undefined;
        this.drawEntity = undefined;
        this.hideTooltip()
        this.viewer._element.style.cursor = 'default';
        this.viewer.enableCursorStyle = true;
    }

    //清空绘制
    clear() {
        if (this.drawEntity) {
            this.viewer.entities.remove(this.drawEntity);
            this.drawEntity = undefined;
        }
    }

    //初始化事件
    initEvents() {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.DrawStartEvent = new Cesium.Event(); //开始绘制事件
        this.DrawEndEvent = new Cesium.Event(); //结束绘制事件
        this.CancelEvent = new Cesium.Event()
    }

    //注册鼠标事件
    registerEvents() {
        // 开始绘制时添加一个div作为提示
        this.viewer._element.style.cursor = 'crosshair';

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
        document.getElementById('vc-tooltip').innerHTML = '点击左键开始，点击右键完成'

        this.leftClickEvent();
        this.rightClickEvent();
        this.mouseMoveEvent();
    }

    leftClickEvent() {
        //单击鼠标左键画点
        this.handler.setInputAction(e => {
            let position = this.viewer.scene.pickPosition(e.position);
            if (!position) {
                position = this.viewer.scene.camera.pickEllipsoid(e.position, this.viewer.scene.globe.ellipsoid);
            }
            if (!position) return;
            this.positions.push(position);
            this.tempPositions.push(position);
            if (this.positions.length === 1) {
                this.handleFirstPosition();
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    handleFirstPosition() {
        switch (this.drawType) {
            case "Point":
                this.generatePoint();
                this.drawEnd();
                break;
            case "Polyline":
                this.generatePolyline();
                break;
            case "Polygon":
                this.generatePolygon();
                break;
            case "Circle":
                this.generateCircle()
                break;
            case "Rectangle":
                this.generateRect()
                break;
        }
    }

    generatePoint() {
        this.drawEntity = this.viewer.entities.add({
            position: this.positions[0], id: 'markerPoint' + Math.random(), // point: {
            //   pixelSize: 4,
            //   color: Cesium.Color.RED
            // },
            billboard: {
                image: "http://120.27.230.6/tjch/cesium/resource/img/locate.png", verticalOrigin: Cesium.VerticalOrigin.BOTTOM//贴地属性
            },
        })
    }

    generatePolyline() {
        this.drawEntity = this.viewer.entities.add({
            id: 'markerLine' + Math.random(), position: this.positions[0], polyline: {
                positions: new Cesium.CallbackProperty(e => {
                    return this.tempPositions;
                }, false), width: 3, material: new Cesium.PolylineOutlineMaterialProperty({
                    color: Cesium.Color.YELLOW,
                }), depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
                    color: Cesium.Color.YELLOW,
                }),
            }
        })
    }

    generatePolygon() {
        this.drawEntity = this.viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.CallbackProperty(e => {
                    return new Cesium.PolygonHierarchy(this.tempPositions);
                }, false), material: Cesium.Color.RED.withAlpha(0.4), // perPositionHeight: true
            }, polyline: {
                positions: new Cesium.CallbackProperty(e => {
                    return this.tempPositions.concat(this.tempPositions[0]);
                }, false), width: 1, material: new Cesium.PolylineDashMaterialProperty({
                    color: Cesium.Color.YELLOW,
                }), depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                    color: Cesium.Color.YELLOW,
                }),
            }
        })
    }

    generateCircle() {
        this.drawEntity = this.viewer.entities.add({
            position: this.positions[0], name: "circle", ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(() => {
                    const r = Math.sqrt(Math.pow(this.tempPositions[0].x - this.tempPositions[this.tempPositions.length - 1].x, 2) + Math.pow(this.tempPositions[0].y - this.tempPositions[this.tempPositions.length - 1].y, 2));
                    return r ? r : r + 1;
                }, false), semiMajorAxis: new Cesium.CallbackProperty(() => {
                    let r = Math.sqrt(Math.pow(this.tempPositions[0].x - this.tempPositions[this.tempPositions.length - 1].x, 2) + Math.pow(this.tempPositions[0].y - this.tempPositions[this.tempPositions.length - 1].y, 2))
                    return r ? r : r + 1;
                }, false), material: Cesium.Color.RED.withAlpha(0.5), outline: true
            }
        });
    }

    generateRect() {
        // let arr = []
        // let arr1 = [
        //   this.positions[0],
        //   this.tempPositions[this.tempPositions.length - 1]
        // ]
        // arr1.forEach(item => {
        //   let obj = cartesian3ToXyz(item, this.viewer)
        //   arr.push(obj.lng)
        //   arr.push(obj.lat)
        // })
        // console.log(arr);

        // let p1 = cartesian3ToXyz(this.positions[0], this.viewer)
        // console.log(p1);
        // let p2 = cartesian3ToXyz(this.tempPositions[this.tempPositions.length - 1], this.viewer)
        //
        // let tc = turf.midpoint(turf.point([p1.lng, p1.lat]), turf.point([p2.lng, p2.lat]))
        //
        // console.log(tc.geometry.coordinates);
        //
        // let pos  = Cesium.Cartesian3.fromDegrees(tc.geometry.coordinates[0], tc.geometry.coordinates[1])
        // let pos = new Cesium.Cartesian3()
        // Cesium.Cartesian3.midpoint(this.positions[0], this.positions[this.positions.length - 1], pos)
        this.drawEntity = this.viewer.entities.add({
            name: "rectangle", // position: this.positions[this.positions.length - 1],
            rectangle: {
                coordinates: new Cesium.CallbackProperty(() => {
                    return Cesium.Rectangle.fromCartesianArray([this.positions[0], this.tempPositions[this.tempPositions.length - 1]])
                }, false), material: Cesium.Color.RED.withAlpha(0.4)
            }
        })
    }

    mouseMoveEvent() {
        this.handler.setInputAction(e => {
            this.viewer._element.style.cursor = 'crosshair'; //由于鼠标移动时 Cesium会默认将鼠标样式修改为手柄 所以移动时手动设置回来
            let position = this.viewer.scene.pickPosition(e.endPosition);
            if (!position) {
                position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, this.viewer.scene.globe.ellipsoid);
            }
            if (!position) return;
            if (!this.drawEntity) return;
            // this.tempPositions.pop()
            this.tempPositions = this.positions.concat([position]);

            document.onmousemove = function (e) {
                const vcTooltipDom = document.getElementById('vc-tooltip')
                if (vcTooltipDom) {
                    vcTooltipDom.style.top = e.clientY + 15 + 'px'
                    vcTooltipDom.style.left = e.clientX + 15 + 'px'
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    rightClickEvent() {
        this.handler.setInputAction(e => {
            if (!this.drawEntity) {
                this.deactivate()
                this.CancelEvent.raiseEvent()
                return;
            }
            switch (this.drawType) {
                case "Polyline":
                    this.drawEntity.polyline.positions = this.positions;
                    this.minPositionCount = 2;
                    break;
                case "Polygon":
                    this.drawEntity.polygon.hierarchy = this.positions;
                    this.drawEntity.polyline.positions = this.positions.concat(this.positions[0]);
                    this.minPositionCount = 3;
                    break;
                case 'Rectangle':
                    let pos = new Cesium.Cartesian3()
                    Cesium.Cartesian3.midpoint(this.positions[0], this.positions[this.positions.length - 1], pos)
                    this.drawEntity.position = pos
                    break;
            }
            if (this.positions.length < this.minPositionCount) {
                this.clear();
                this.CancelEvent.raiseEvent()
                this.deactivate();
                return;
            }
            this.drawEnd();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //解除鼠标事件
    unRegisterEvents() {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }

    //绘制结束 触发结束事件
    drawEnd() {
        this.drawEntity.remove = () => {
            this.viewer.entities.remove(this.drawEntity);
        }
        this.hideTooltip()
        this.DrawEndEvent.raiseEvent(this.drawEntity, this.positions, this.drawType);
        this.deactivate();
    }

    hideTooltip() {
        const vcTooltipDom = document.getElementById('vc-tooltip')
        vcTooltipDom && document.body.removeChild(vcTooltipDom)
    }
}
