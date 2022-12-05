export default class BuildInfoWindow{

    /**
     * @param {Object} viewer 当前视图对象
     * @param {Object} position 位置
     * @param {Object} title 标题
     * @param {Object} fields 参数
     * @param {Object} values 值
     */
    constructor(viewer,position, title, fields, values,id){
        this.viewer = viewer,
        this.id = id,
        this.position = position,
        this.title = title,
        this.fields = fields,
        this.values = values,
        this.createDom(),
        viewer.cesiumWidget.container.appendChild(this.container),
        this.initDom(),
        this.initEvent(),
        this.addPostRender();
    }
	/**
	 * 创建dom元素
	 */
	createDom(){
		this.container = document.createElement('div'),
		this.container.innerHTML = '\x20\x20<div\x20class=\x22MultiFieldAdaptWindow-container\x22\x20v-if=\x22show\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22MultiFieldAdaptWindow-header\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input id="titleInput" style="font-size: 20px;background: transparent;width: 60%;border: none;color: white;" value="'+ this.title +'" class=\x22MultiFieldAdaptWindow-title\x22>\x20\x20' +
		'<span class="MultiFieldAdaptWindow-close" title="关闭"  >×</span></div>'+
		'  <div class="MultiFieldAdaptWindow-body" style="background-color:transparent !important">' +
		'  </div>' +
		'</div>'
	}
	/**
	 * 初始化dom
	 */
	initDom(){
		for (var i = 1; i < this.values.length-1; i++) {
        var divDom = document.createElement('div');
        divDom.classList.add('MultiFieldAdaptWindow-info-item');
        var spanDom = document.createElement('span');
        spanDom.classList.add('MultiFieldAdaptWindow-ifno-label'),
        spanDom.innerHTML = this.fields[i] + '：',
        divDom.appendChild(spanDom),
        (spanDom = document.createElement('input')).classList.add('MultiFieldAdaptWindow-ifno-text'),
      spanDom.id = 'value' + i
		  spanDom.value = this.values[i],
		  divDom.appendChild(spanDom),
		  this.container.getElementsByClassName('MultiFieldAdaptWindow-body')[0].appendChild(divDom);
		}
    var pdfDom = document.createElement('div');
    pdfDom.classList.add('pdfBox')
    pdfDom.id = 'pdfBox'
    pdfDom.innerHTML ='<span style="width:90px;">居民列表：</span><span class="pdfHref" style="cursor:pointer;color:white;font-size:17px">' + '住户详情' + "</span>"
    // this.values[this.values.length-1]
    divDom.appendChild(pdfDom)


    var dialogDom = document.createElement('div');
    dialogDom.classList.add('dialogDom')
    dialogDom.id = 'dialogDom'
    var close = document.createElement('span');
    // close.classList.add('el-icon-close')
    close.id = 'closeBox'
    close.innerHTML = 'x'
    dialogDom.appendChild(close)
    viewer.cesiumWidget.container.appendChild(dialogDom);
	}

  /**
	 * 注册事件
	 */
	initEvent(){
		var that = this;
    //关闭事件
		that.container.getElementsByClassName('MultiFieldAdaptWindow-close')[0].onclick = function(e){
      that.close();
		};
    var titleChange =  document.getElementById('titleInput')
    titleChange.onchange = function(e){
      that.geoUpdate('titleInput',e.target.value,that.id)
    }

    //修改事件
    for (var i = 1; i < that.values.length; i++) {
      var change = document.getElementById('value'+i)
      if(i<that.values.length-1){
        change.onchange= function(e){
          that.geoUpdate(e.target.id,e.target.value,that.id)
        }
      }else{

      }
    }
    document.getElementById('pdfBox').onclick= function(e){
      // "http://120.27.230.6/py_pdf" +
     // document.getElementById('pdfId').value = true
       document.getElementById('dialogDom').style.display= "block"
       var pdfMain = document.createElement('iframe');
       pdfMain.id = 'pdfIframe'
       pdfMain.src = 'http://120.27.230.6/py_pdf/' + that.values[0] + '/' + that.values[1] + '/' + that.values[2] + '.pdf'
         if (document.getElementById('pdfIframe')) {
          setTimeout(() => {
           document.getElementById('pdfIframe').contentWindow.location.reload(true);
          }, 200)
         }
       document.getElementById('dialogDom').appendChild(pdfMain)
    }
    document.getElementById('closeBox').onclick= function(e){
      document.getElementById('dialogDom').removeChild(document.getElementById('pdfIframe'))
      document.getElementById('dialogDom').style.display= "none"
    }
	}

  /**
   * @param {Object} type 修改字段属性名
   * @param {Object} value 修改字段属性值
   * @param {Object} id 修改图层id
   */
  geoUpdate(type,value,id){
    var xml = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:opengis="http://webgis.com" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">';
    xml += '<wfs:Update typeName="py:xssq">';
    if(type == 'titleInput'){
      xml += '<wfs:Property>';
      xml += '<wfs:Name>SHEQU</wfs:Name>';
      xml += '<wfs:Value>' + value + '</wfs:Value>';
      xml += '</wfs:Property>';
    }
    if(type == 'value1'){
      xml += '<wfs:Property>';
      xml += '<wfs:Name>XIAOQU</wfs:Name>';
      xml += '<wfs:Value>' + value + '</wfs:Value>';
      xml += '</wfs:Property>';
    }
    if(type == 'value2'){
      xml += '<wfs:Property>';
      xml += '<wfs:Name>LOUZHUANG</wfs:Name>';
      xml += '<wfs:Value>' + value + '</wfs:Value>';
      xml += '</wfs:Property>';
    }
    if(type == 'value3'){
      xml += '<wfs:Property>';
      xml += '<wfs:Name>RENSHU</wfs:Name>';
      xml += '<wfs:Value>' + value + '</wfs:Value>';
      xml += '</wfs:Property>';
    }
    xml += '<ogc:Filter>';
    xml += '<ogc:FeatureId fid="' + id + '"/>';
    xml += '</ogc:Filter>';
    xml += '</wfs:Update>';
    xml += '</wfs:Transaction>';
    $.ajax({
      url:'http://120.27.230.6:8080/geoserver/wfs',
      async: false,
      data:xml,
      type:'Post',
      contentType: 'text/xml',
      success(result) {
      },
      error(err) {
        console.log(err);
      }
    })
    // axios({
    //   url: 'http://120.27.230.6:8080/geoserver/wfs',
    //   method:'post',
    //   data:xml,
    //   headers:{'Content-Type': 'application/json'}
    // }).then(res => {

    // })
  }

  /**
   * 添加render事件
   */
  addPostRender(pointArr){
    this.viewer.scene.postRender.addEventListener(this.postRender, this);
  }

  /**
   * render事件
   */
  postRender(){
    var position, height;
    this.container && this.container.style && (
      height = this.viewer.scene.canvas.height,
      position = new Cesium.Cartesian2(),
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, position),
      this.container.style.position = 'absolute',
      this.container.style.bottom = height - position.y + 80 + 'px',
      height = this.container.scrollWidth,
      this.container.style.left = position.x - height / 2 + 'px'
    );
  }

  /**
   * 关闭事件
   */
  close(){
    this.container.remove();
    var entityArr = this.viewer.entities._entities._array;
    this.viewer.entities.remove(entityArr[entityArr.length-1]);
    this.viewer.scene.postRender.removeEventListener(this.postRender, this);
  }




}
