/**
 * @name: measure
 * @author: wangwei
 * @date: 2022/9/29 9:38
 * @description：测量工具
 * @update: 2022/9/29 9:38
 */

import * as Map3dTools from "../lib/Map3dTools/Map3dTools";

export default class MeasureTools {
  /**
   * 测量工具
   * @param viewer
   * @param type 测量类型
   * @param fun callback函数 判断是否绘制完成
   */
  constructor(viewer, type, fun) {
    this.viewer = viewer;
    this.type = type;
    this.fun = fun
    this.mhTool = null
    this.maTool = null
    this.mdTool = null
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  initMeasureTools() {
    switch (this.type) {
      case "height":
        this.mhTool = new xt3d.Map3dTools.Measure.Height(this.viewer);
        this.measureHeight();
        break;
      case "distance":
        this.mdTool = new Map3dTools.Measure.Distance(this.viewer);
        this.measureDistance()
        break;
      case "area":
        this.maTool = new Map3dTools.Measure.Area(this.viewer);
        this.measureArea();
        break;
      case "clear":
        this.clear();
        break;
    }
  }

//测距
  measureDistance() {
    this.clear();
    this.mdTool.activate();
    this.mdTool.MeasureEndEvent.addEventListener(() => {
      this.fun()
    })
  }

//测面
  measureArea() {
    this.clear();
    this.maTool.activate();
    this.maTool.MeasureEndEvent.addEventListener(() => {
      this.fun()
    })
  }

//测高
  measureHeight() {
    this.clear();
    this.mhTool.activate();
    this.mhTool.MeasureEndEvent.addEventListener(() => this.fun())
  }

//清除
  clear() {

    this.mhTool && this.mhTool.deactivate();
    this.mhTool && this.mhTool.clear();

    this.mdTool && this.mdTool.deactivate();
    this.mdTool && this.mdTool.clear();

    this.maTool && this.maTool.deactivate();
    this.maTool && this.maTool.clear();
  }

}


