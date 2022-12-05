/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2022-01-20
 * 类型：cesium LED文本
 */

export default class LedText{

  /**
   * @param {Object} viewer 视图
   * @param {Object} position 位置
   * @param {Object} village 文本
   */
  constructor(viewer, position, village){
    this.viewer = viewer,
    this.position = position,
    this.village = village,
    this.initDom(),
    this.initEvent();
  }

	/**
	 * 初始化dom
	 */
	initDom(){
		this.$htmlContainer = document.createElement('div'),
		this.$htmlContainer.classList.add('label-led-container'),
		this.$htmlContainer.innerHTML = this.village.RENSHU,

    this.divDom = document.createElement('div'),
    this.divDom.classList.add('label-led-cun'),
    this.divDom.innerHTML = this.village.CunName,

    this.$htmlContainer.appendChild(this.divDom)


		this.viewer.cesiumWidget.container.appendChild(this.$htmlContainer),
		this.viewer.scene.postRender.addEventListener(this.postRenderEvent, this);
    window.fwbz = this.$htmlContainer
	}


  /**
	 * 初始化事件
	 */
	initEvent(position,image){
    this.viewer.scene.postRender.addEventListener(this.postRenderEventHandle, this);
	}

  /**
	 * render处理事件
	 */
	postRenderEventHandle(){
    var canvasHeight = this.viewer.scene.canvas.height
    var pos = new Cesium.Cartesian2();
    Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene,
    this.position, pos),
    this.$htmlContainer.style.bottom = canvasHeight + 30 - pos.y + 'px',
    canvasHeight = this.$htmlContainer.offsetWidth,
    this.$htmlContainer.style.left = pos.x - canvasHeight / 2 + 'px',
    (pos = this.viewer.camera.position,
    canvasHeight = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(pos)
    .height),
    (canvasHeight += this.viewer.scene.globe.ellipsoid.maximumRadius,
    Cesium.Cartesian3.distance(pos, this.position) > canvasHeight ?
    this.$htmlContainer.style.display = 'none' :
     (this.$htmlContainer.style.display = 'block',
    2000 > this.viewer.camera.positionCartographic.height || 45000 < this.viewer.camera.positionCartographic.height ?
    this.$htmlContainer.style.display = 'none' :
    this.$htmlContainer.style.display = 'block'));
	}


  /**
   * 清除
   */
  remove(){
    this.viewer.scene.postRender.removeEventListener(this.postRenderEventHandle, this);
  }

}
