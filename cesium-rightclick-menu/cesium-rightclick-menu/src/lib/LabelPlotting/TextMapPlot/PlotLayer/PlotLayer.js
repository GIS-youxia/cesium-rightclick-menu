/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2022-04-08
 * 类型：cesium文字贴图
 */

export default class PlotLayer{
	/**
   * @param {Object} viewer 视图
   */
  constructor(viewer){
    this.viewer = viewer
    return (viewer.selectedPlotChanged = new Cesium.Event(),viewer);
  }

	/**
	 * 添加点
	 */
	addPlot(feature){
		return feature = _0x5c697c(this.viewer, feature.properties.plotType, feature),
		(this.plots.push(feature),feature);
	}

  /**
   * 注册render事件
   */
  flyToByPlotCode(feature){
    var fea = this.getByPlotCode(feature);
    if (fea) {
        switch (fea.properties.plotType) {
        case _0x3dadd4.WALL:
            this.viewer.flyTo(fea.wallEntity);
            break;
        case _0x3dadd4.POLYGON:
            this.viewer.flyTo(fea.polygonEntity);
        }
        this.setSelectedPlotByCode(feature);
    }
  }

  /**
   * render事件
   */
  initEvent(tileset){
    var that = this;
    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(_0x14feff) {
        that.plotSelecteable && ((_0x14feff = that.viewer.scene.pick(
        _0x14feff.position)) && _0x14feff.id ? (_0x14feff.id&& _0x14feff.id.type && 'TextMapPlot' == _0x14feff.id.type ||_0x30655e.selectedPlot && (_0x30655e.selectedPlot.setSelected(false),
        that.selectedPlot = void 0x0,
        that.selectedPlotChanged.raiseEvent(void 0x0)),
        that.selectedPlot && that.selectedPlot.properties.plotCode == _0x14feff.id.plotCode ||
        ((_0x14feff = that.getByPlotCode(_0x14feff.id.plotCode)) ?
        (that.clearSelectedPlot(),
        that.selectedPlot = _0x14feff,
        that.selectedPlot.setSelected(true),
        that.selectedPlotChanged.raiseEvent(_0x14feff)) : (that.selectedPlot && (that.selectedPlot.setSelected(false),
        that.selectedPlot = void 0x0),
        that.selectedPlotChanged.raiseEvent(void 0x0)))) :
        that.selectedPlot && (that.selectedPlot.setSelected(false),
        that.selectedPlot = void 0x0,
        that.selectedPlotChanged.raiseEvent(void 0x0)));
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  setSelectedPlotByCode(feature){
    this.clearSelectedPlot(),
    feature = this.getByPlotCode(feature),
    feature && (this.selectedPlot = feature,
    this.selectedPlot.setSelected(true),
    this.selectedPlotChanged.raiseEvent(feature));
  }

  clearSelectedPlot(){
    this.selectedPlot && (this.selectedPlot.setSelected(false),
    this.selectedPlot = void 0x0);
  }


}
