/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2022-01-21
 * 类型：cesium 提示框
 */
export default class PlotUtils{
	/**
	 * @param viewer 三维视图
	 */
    constructor(viewer){
      this.viewer = viewer,
      this.type = {
        'MARKER': 'marker',
        'TEXT': 'text',
        'POLYLINE': 'polyline',
        'POLYGON': 'polygon',
        'CIRCLE': 'circle',
        'RECTANGLE': 'rectangle',
        'DYNAMICFENCE': 'dynamicfence',
        'NORMALFENCE': 'normalfence',
        'CORRIDOR':'corridor',
        'POLYLINEVOLUME': 'polylinevolume'
      },
    }
	/**
	 * 激活
	 */
	activate(plotType){
		this.deactivate(),
		this.clear(),
		this.plotType = plotType,
		this.positions = [],
		this.plotDrawTip = new _0x33af9a(this.viewer),
		this.MousePoint = new _0x450ebc(this.viewer),
		this.registerEvents(),
		this.viewer.enableCursorStyle = false,
		this.viewer._element.style.cursor = 'default',
		this.initTip();
	}
  
	/**
	 * 修改位置
	 */
	initTip(){
		switch (this.plotType) {
		  case _0xa1e914.MARKER:
		    this.plotDrawTip.setContent(['当前绘制类型：点，需要1个点', '按下鼠标左键确定位置', '按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.TEXT:
		    this.plotDrawTip.setContent(['当前绘制类型：文本，需要1个点', '按下鼠标左键确定位置','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.POLYLINE:
		    this.plotDrawTip.setContent(['当前绘制类型：线，最少需要2个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.POLYGON:
		    this.plotDrawTip.setContent(['当前绘制类型：面，最少需要3个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.CIRCLE:
		    this.plotDrawTip.setContent(['当前绘制类型：圆，需要2个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.RECTANGLE:
		    this.plotDrawTip.setContent(['当前绘制类型：矩形，需要2个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.DYNAMICFENCE:
		    this.plotDrawTip.setContent(['当前绘制类型：动态围栏，最少需要2个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.NORMALFENCE:
		    this.plotDrawTip.setContent(['当前绘制类型：静态围栏，最少需要2个点', '按下鼠标左键确定第1个点', '按下鼠标右键取消绘制']);
		    break;
		  case _0xa1e914.POLYLINEVOLUME:
		    this.plotDrawTip.setContent(['当前绘制类型：普通墙体，最少需要2个点', '按下鼠标左键确定第1个点','按下鼠标右键取消绘制']);
		}
	}
	/**
	 * 添加挂载事件
	 */
	addPostRender(){
		this.viewer.scene.postRender.addEventListener(this.postRender, this);
	}
	/**
	 * 开始挂载
	 */
	postRender(){
		var canvasHeight, pos;
		this.container && this.container.style && this.position && (canvasHeight =
		this.viewer.scene.canvas.height,
		pos = new Cesium.Cartesian2(),
		Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene,
		this.position, pos),
		this.container.style.bottom = canvasHeight - pos.y - 20 + 'px',
		this.container.offsetWidth,
		this.container.style.left = pos.x + 50 + 'px');
	}

  /**
   * 移除
   */
  remove(){
    this.viewer.cesiumWidget.container.removeChild(this.container),
    this.viewer.scene.postRender.removeEventListener(this.postRender, this);
  }

  /**
   * 创建dom
   */
  createDom(){
    this.container = document.createElement('div'),
    this.container.classList.add('plot-draw-tip-container'),
    this.viewer.cesiumWidget.container.appendChild(this.container);
  }

  /**
   * 移除所有html元素
   */
  removeAllChild(){
    for (;this.container.hasChildNodes();){
      this.container.removeChild(this.container.firstChild);
    }
  }
}
