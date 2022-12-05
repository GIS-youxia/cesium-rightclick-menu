(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["landscape-components"] = factory(require("vue"));
	else
		root["landscape-components"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".map__wrap[data-v-4e672d48]{position:relative;overflow:hidden;height:100%}.map__wrap .alertMenu[data-v-4e672d48]{position:absolute;display:flex;width:320px;height:250px;border-radius:4px;z-index:9999}.map__wrap .alertMenu .level__one[data-v-4e672d48]{border:1px solid rgba(53,123,181,.6);background:#081a26;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;cursor:pointer;color:#cce3ff;font-size:14px}.map__wrap .alertMenu .level__one .level__one__item[data-v-4e672d48]{padding:5px 0;width:100%;display:flex}.map__wrap .alertMenu .active[data-v-4e672d48]{background-color:rgba(53,123,181,.6)}.map__wrap .alertMenu .level__two[data-v-4e672d48]{border:1px solid rgba(53,123,181,.6);background:#081a26;margin-left:2px;width:40%;display:flex;align-self:baseline;flex-direction:column;align-items:center;cursor:pointer;color:#cce3ff;font-size:14px}.map__wrap .alertMenu .level__two .level__two__item[data-v-4e672d48]{padding:5px 0;width:100%;display:flex;align-items:center;justify-content:center}.map__wrap .height__as[data-v-4e672d48]{position:absolute;top:20px;right:20px;background:#081a26;border:1px solid rgba(53,123,181,.6);width:200px;padding:10px}.map__wrap .height__as .h__content[data-v-4e672d48]{display:flex;align-items:center;color:#fff}.map__wrap .fc_dialog[data-v-4e672d48]{position:absolute;top:20px;right:20px;background:#081a26;border:1px solid rgba(53,123,181,.6);width:200px;padding:10px;color:#fff}.map__wrap .el-slider[data-v-4e672d48]{width:140px}#slider[data-v-4e672d48]{position:absolute;left:50%;top:0;background-color:#d3d3d3;width:5px;height:100%;z-index:9999}#slider[data-v-4e672d48]:hover{cursor:ew-resize}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ (function(module) {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 962:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(796);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(402)/* ["default"] */ .Z)
var update = add("085a1cc3", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 402:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ addStylesClient; }
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 838:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/kaiwa_bottom.12438e79.png";

/***/ }),

/***/ 186:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/kaiwa_side.5687b966.png";

/***/ }),

/***/ 203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

// NAMESPACE OBJECT: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Measure/Measure.js
var Measure_namespaceObject = {};
__webpack_require__.r(Measure_namespaceObject);
__webpack_require__.d(Measure_namespaceObject, {
  "Area": function() { return Area; },
  "Distance": function() { return MeasureDistance; },
  "Height": function() { return MeasureHeight; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue?vue&type=template&id=4e672d48&scoped=true&
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"map__wrap"},[_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":"map3d"}},[(_vm.sliderShow)?_c('div',{attrs:{"id":"slider"}}):_vm._e()]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.alertMenuState),expression:"alertMenuState"}],ref:"alertMenu",staticClass:"alertMenu",style:(_vm.alertMenuStyle)},[_c('div',{staticClass:"level__one"},_vm._l((_vm.menuList),function(item,index){return _c('div',{key:index,ref:`menuItem${index}`,refInFor:true,class:[_vm.activeIndex === index ? 'level__one__item active' : 'level__one__item'],on:{"mouseover":function($event){return _vm.handleHover(index)},"click":function($event){return _vm.executionMethod(item.handler, undefined)}}},[_c('div',{staticStyle:{"padding-left":"10px"}},[_c('i',{class:['icon iconfont ' + item.icon]})]),_vm._v("  "+_vm._s(item.label)+"  "),(item.children)?_c('div',[_c('i',{staticClass:"icon iconfont icon-you",staticStyle:{"font-size":"12px"}})]):_vm._e()])}),0),(_vm.activeMenuList&&_vm.activeMenuList.length)?_c('div',{staticClass:"level__two",style:(_vm.menu_level2Style)},_vm._l((_vm.activeMenuList),function(child,cIndex){return _c('div',{key:cIndex,class:[_vm.activeSubIndex === cIndex ? 'level__two__item active' : 'level__two__item'],on:{"click":function($event){return _vm.executionMethod(child.handler, cIndex)},"mouseover":function($event){return _vm.handleSubHover(cIndex)}}},[_c('div',[_c('i',{class:['icon iconfont ' + child.icon]})]),_vm._v("   "),_c('span',[_vm._v(_vm._s(child.isSwitch ? child.active ? '关闭' : '开启' : ''))]),_vm._v(_vm._s(child.label)+" ")])}),0):_vm._e()]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.limitHeightShow),expression:"limitHeightShow"}],staticClass:"height__as"},[_c('div',{staticClass:"h__content"},[_c('div',{staticStyle:{"padding-right":"10px"}},[_vm._v(" 高度: ")]),_c('div',[_c('el-slider',{attrs:{"show-tooltip":true,"min":1,"step":0.5,"max":1000},on:{"input":_vm.valueChange},model:{value:(_vm.height),callback:function ($$v) {_vm.height=$$v},expression:"height"}})],1)])]),(_vm.properties)?_c('FcDialog',{staticClass:"fc_dialog",attrs:{"properties":_vm.properties}}):_vm._e(),(_vm.delDialogShow)?_c('div',{staticClass:"draw_dialog"},[_c('div',{staticClass:"close_icon",on:{"click":function($event){_vm.delDialogShow = false}}}),_c('div',{staticClass:"outer_box"},[_c('div',{staticClass:"inner_box"},[_c('div',{staticClass:"content"},[_vm._v(" 确定删除？ ")]),_c('div',{staticStyle:{"display":"flex","justify-content":"space-around"}},[_c('div',{staticClass:"confirm_btn",on:{"click":_vm.onCancel}},[_c('span',[_vm._v("取消")])]),_c('div',{staticClass:"confirm_btn",on:{"click":_vm.onDelete}},[_c('span',[_vm._v("确定")])])])])])]):_vm._e()],1)
}
var staticRenderFns = []


;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/utils/common_tools.js
/**
 * @name: common_tools
 * @author: wangwei
 * @date: 2022/9/23 9:21
 * @description：common_tools
 * @update: 2022/9/23 9:21
 */
function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

/**
 *
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {{top: string, left: string}}
 */
function disPlayPositionCtrl(x, y, width, height) {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;
  let position = {};
  if (x < clientWidth - width && y < clientHeight - height) {
    // 右击位置满足展示完整的菜单(宽，高都满足)
    position = {
      left: x + 6 + "px",
      top: y + 6 + "px",
    };
  } else {
    // 右击的右下角--点击的位置无法展示完整的菜单(宽满足，高不满足)
    position = {
      left: x - 2 - width + "px",
      top: y - 6 - height + "px",
    };
  }
  return position;
}



// 根据条件排序
function compare(pro) {
  return function (obj1, obj2) {
    var val1 = obj1[pro];
    var val2 = obj2[pro];
    if (val1 > val2) { //正序
      return 1;
    } else if (val1 < val2) {
      return -1;
    } else {
      return 0;
    }
  }
}

// 数据四舍五入
function getFloat(number, n) {
  n = n ? parseInt(n) : 0;
  if (n <= 0) return Math.round(number);
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
  return number;
}

//百分数转小数
function toPoint(percent) {
  var str = percent.replace("%", "");
  str = str / 100;
  return str;
}

// 生成随机字母
function getRanNum() {
  var result = [];
  for (var i = 0; i < 4; i++) {
    var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
    //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
    result.push(String.fromCharCode(65 + ranNum));
  }
  return result.join('');
}



// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(203);
;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/utils/common_cesium.js

/**
 * @name: common_cesium
 * @author: wangwei
 * @date: 2022/9/22 16:56
 * @description：common_cesium
 * @update: 2022/9/22 16:56
 */


// import colors from '../components/comprehensiveMap/colors.json'


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



;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/LabelPlotting/EntityDraw/index.js
class EntityDraw {
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
      position: this.positions[0],
      id: 'markerPoint' + Math.random(),
      // point: {
      //   pixelSize: 4,
      //   color: Cesium.Color.RED
      // },
      billboard: {
        image: "static/img/locate.png",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM//贴地属性
      },
    })
  }

  generatePolyline() {
    this.drawEntity = this.viewer.entities.add({
      id: 'markerLine' + Math.random(),
      position: this.positions[0],
      polyline: {
        positions: new Cesium.CallbackProperty(e => {
          return this.tempPositions;
        }, false),
        width: 3,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.YELLOW,
        }),
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
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
        }, false),
        material: Cesium.Color.RED.withAlpha(0.4),
        // perPositionHeight: true
      },
      polyline: {
        positions: new Cesium.CallbackProperty(e => {
          return this.tempPositions.concat(this.tempPositions[0]);
        }, false),
        width: 1,
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.YELLOW,
        }),
        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.YELLOW,
        }),
      }
    })
  }

  generateCircle() {
    this.drawEntity = this.viewer.entities.add({
      position: this.positions[0],
      name: "circle",
      ellipse: {
        semiMinorAxis: new Cesium.CallbackProperty(() => {
          const r = Math.sqrt(
            Math.pow(this.tempPositions[0].x - this.tempPositions[this.tempPositions.length - 1].x, 2) +
            Math.pow(this.tempPositions[0].y - this.tempPositions[this.tempPositions.length - 1].y, 2)
          );
          return r ? r : r + 1;
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(() => {
          let r = Math.sqrt(
            Math.pow(this.tempPositions[0].x - this.tempPositions[this.tempPositions.length - 1].x, 2) +
            Math.pow(this.tempPositions[0].y - this.tempPositions[this.tempPositions.length - 1].y, 2)
          )
          return r ? r : r + 1;
        }, false),
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true
      }
    });
  }

  generateRect() {
    this.drawEntity = this.viewer.entities.add({
      name: "rectangle",
      position: this.positions[0],
      rectangle: {
        coordinates: new Cesium.CallbackProperty(() => {
          return Cesium.Rectangle.fromCartesianArray([this.positions[0], this.tempPositions[this.tempPositions.length - 1]])
        }, false),
        material: Cesium.Color.RED.withAlpha(0.5)
      }
    });
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

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Measure/Area/Area.js
/**
 * 作者：CZH
 * 公司：杭州同济测绘有限公司
 * 版本：1.0.0
 * 编写时间：2021-11-17
 * 类型：cesium测量
 */
class Area {

  /**
   * @param {Object} viewer 当前视图对象
   */
  constructor(viewer) {
    this.viewer = viewer,
      this.initEvents(),
      this.positions = [],
      this.tempPositions = [],
      this.vertexEntities = [],
      this.labelEntity = undefined,
      this.measureArea = 0;
  }

  /**
   * 初始化事件
   */
  initEvents() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
      this.MeasureStartEvent = new Cesium.Event(),
      this.MeasureEndEvent = new Cesium.Event();
  }

  /**
   * 创建entity
   */
  createPolygonEntity() {
    var that = this;
    this.polygonEntity = this.viewer.entities.add({
      id: 'customize',
      'polygon': {
        'hierarchy': new Cesium.CallbackProperty(function (e) {
          return new Cesium.PolygonHierarchy(that.tempPositions);
        }, false),
        'material': Cesium.Color.RED.withAlpha(0.4),
        'perPositionHeight': false
      },
      'polyline': {
        'positions': new Cesium.CallbackProperty(function (e) {
          return that.tempPositions.concat(that.tempPositions[0]);
        }, false),
        'width': 1,
        'material': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        }),
        'depthFailMaterial': new Cesium.PolylineDashMaterialProperty({
          'color': Cesium.Color.YELLOW
        })
      }
    });
  }

  /**
   * 创建顶点entity
   */
  createVertex() {
    var vertexEntity = this.viewer.entities.add({
      'position': this.positions[this.positions.length - 1],
      'type': 'MeasureAreaVertex',
      'point': {
        'color': Cesium.Color.FUCHSIA,
        'pixelSize': 8,
        'disableDepthTestDistance': 500
      }
    });
    this.vertexEntities.push(vertexEntity);
  }

  /**
   * 创建结果展示label
   */
  createResultLabel() {
    var that = this;
    this.mesureResultEntity = this.viewer.entities.add({
      'position': new Cesium.CallbackProperty(function (e) {
        return that.getCenterPosition();
      }, false),
      'type': 'MeasureAreaResult',
      'label': {
        'text': new Cesium.CallbackProperty(function (e) {
          return '面积' + that.getArea(that.tempPositions) + '平方米';
        }, false),
        'scale': 0.5,
        'font': 'normal 28px MicroSoft YaHei',
        'distanceDisplayCondition': new Cesium.DistanceDisplayCondition(0, 5000),
        'scaleByDistance': new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
        'verticalOrigin': Cesium.VerticalOrigin.BOTTOM,
        'style': Cesium.LabelStyle.FILL_AND_OUTLINE,
        'pixelOffset': new Cesium.Cartesian2(0, -30),
        'outlineWidth': 9,
        'outlineColor': Cesium.Color.YELLOW
      }
    });
  }

  /**
   * 获取中心点
   */
  getCenterPosition() {
    var that = this
    // let pointArr = [];
    if (this.tempPositions.length < 3) {
      return this.tempPositions[0];
    }
    // this.tempPositions.forEach(function (position) {
    //   position = that.cartesian3ToPoint3D(position),
    //   pointArr.push([position.x,position.y]);
    // });
    // //求相交缓冲区交点
    // var hcq = turf.lineString(pointArr),
    // hcq = turf.bbox(hcq),
    // hcq = turf.bboxPolygon(hcq),
    // hcq = turf.center(hcq).geometry.coordinates;

    let position = that.cartesian3ToPoint3D(this.tempPositions[this.tempPositions && this.tempPositions.length - 1])
    return Cesium.Cartesian3.fromDegrees(position.x, position.y, this.height + 20);
  }

  /**
   * 注册鼠标事件
   */
  registerEvents() {

    // 开始绘制时添加一个div作为提示
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
    document.getElementById('vc-tooltip').innerHTML = '点击左键开始绘制，右键结束'

    this.leftClickEvent(),
      this.rightClickEvent(),
      this.mouseMoveEvent();
  }

  /**
   * 左击事件
   */
  leftClickEvent() {
    var that = this;
    this.handler.setInputAction(function (movement) {
      // that.viewer._element.style.cursor = 'crosshair';
      var pos,
        pickPos = that.viewer.scene.pickPosition(movement.position);
      pickPos || (pos = that.viewer.scene.globe.ellipsoid,
        pickPos = that.viewer.scene.camera.pickEllipsoid(movement.position, pos)), pickPos && (
        that.positions.push(pickPos),
          that.height = that.unifiedHeight(that.positions, that.height),
        1 == that.positions.length && that.createPolygonEntity(),
          that.createVertex()
      );
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 右击事件
   */
  rightClickEvent() {
    var that = this;
    this.handler.setInputAction(function (e) {
      !that.isMeasure || that.positions.length < 3 ? (that.deactivate(), that.clear()) :
        (
          that.tempPositions = [].concat(that.positions),
            that.polygonEntity.polyline = {
              'positions': that.positions.concat(that.positions[0]),
              'width': 2,
              'material': Cesium.Color.YELLOW,
              'depthFailMaterial': new Cesium.PolylineDashMaterialProperty({
                'color': Cesium.Color.YELLOW
              })
            },
            that.polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(that.tempPositions),
            that.mesureResultEntity.position = that.getCenterPosition(),
            that.mesureResultEntity.label.text = '总面积' + that.getArea(that.positions) + '平方米',
            that.measureEnd());
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  /**
   * 鼠标移动事件
   */
  mouseMoveEvent() {
    var that = this;
    this.handler.setInputAction(function (movement) {
      var pos;
      that.isMeasure && (that.viewer._element.style.cursor = 'crosshair',
        (
          pos = (pos = that.viewer.scene.pickPosition(movement.endPosition)) || that.viewer.scene.camera.pickEllipsoid(movement.startPosition, that.viewer.scene.globe.ellipsoid)) && that.handleMoveEvent(pos)
      );

      // 提示框随鼠标移动
      document.onmousemove = function (e) {
        const vcTooltipDom = document.getElementById('vc-tooltip')
        if (vcTooltipDom) {
          vcTooltipDom.style.top = e.clientY + 15 + 'px'
          vcTooltipDom.style.left = e.clientX + 15 + 'px'
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 处理鼠标移动坐标
   */
  handleMoveEvent(pos) {
    this.positions.length < 1 ||
    (
      this.height = this.unifiedHeight(this.positions, this.height),
        this.tempPositions = this.positions.concat(pos),
      3 <= this.tempPositions.length && !this.mesureResultEntity && this.createResultLabel()
    );
  }

  /**
   * 获取高度
   */
  unifiedHeight(position, height) {
    var height = height || this.getPositionHeight(position[0]);
    for (var i = 0; i < position.length; i++) {
      var p = position[i],
        pos = this.cartesian3ToPoint3D(p);
      position[i] = Cesium.Cartesian3.fromDegrees(pos.x, pos.y, height);
    }
    return height;
  }

  /**
   * 根据坐标获取高度
   */
  getPositionHeight(position) {
    return Cesium.Cartographic.fromCartesian(position).height;
  }

  /**
   * 坐标转换
   */
  cartesian3ToPoint3D(position) {
    return position = Cesium.Cartographic.fromCartesian(position), {
      'x': Cesium.Math.toDegrees(position.longitude),
      'y': Cesium.Math.toDegrees(position.latitude),
      'z': position.height
    };
  }

  /**
   * 经纬度转平面坐标
   */
  rotatePlane(position) {
    return position = Cesium.Cartographic.fromCartesian(position), [Cesium.Math.toDegrees(position.longitude), Cesium.Math.toDegrees(position.latitude)];
  }

  /**
   * 利用turf计算面积
   */
  getArea(positions) {
    if (positions.length < 3) {
      return 0
    }
    
    var pointArr = [];
    var that = this;
    return positions.forEach(function (position) {
      pointArr.push(that.rotatePlane(position));
    }),
      pointArr.push(pointArr[0]),
      positions = turf.polygon([pointArr]),
      turf.area(positions).toFixed(2);
  }

  /**
   * 激活
   */
  activate() {
    this.deactivate(),
      this.registerEvents(),
      this.viewer.enableCursorStyle = false,
      this.viewer._element.style.cursor = 'crosshair',
      this.isMeasure = true,
      this.measureArea = 0;
  }

  /**
   * 结束绘制
   */
  measureEnd() {
    this.deactivate(),
      this.MeasureEndEvent.raiseEvent(this.measureArea);
  }

  /**
   * 注销事件
   */
  unRegisterEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 注销
   */
  deactivate() {
    this.isMeasure && (
      this.unRegisterEvents(),
        this.hideTooltip(),
        this.viewer._element.style.cursor = 'default',
        this.viewer.enableCursorStyle = true,
        this.isMeasure = false,
        this.tempPositions = [],
        this.positions = [],
        this.height = undefined
    );
  }

  /**
   * 清除
   */
  clear() {
    var that = this;
    this.viewer.entities.remove(this.polygonEntity),
      this.polygonEntity = undefined,
      this.vertexEntities.forEach(function (entity) {
        that.viewer.entities.remove(entity);
      }),
      this.vertexEntities = [],
      this.viewer.entities.remove(this.mesureResultEntity),
      this.mesureResultEntity = undefined,
      this.height = undefined;
  }

  // 绘制结束，删除提示框
  hideTooltip() {
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom && document.body.removeChild(vcTooltipDom)
  }


}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Measure/Height/Height.js
/**
 * @name: Height
 * @author: wangwei
 * @date: 2022/9/29 11:11
 * @description：Height
 * @update: 2022/9/29 11:11
 */
//高度测量类
class MeasureHeight {
  constructor(viewer) {
    this.viewer = viewer;
    this.initEvents();
    this.positions = [];
    this.vertexEntities = [];
    this.labelEntity = undefined;
    this.measureHeight = 0; //测量结果
  }

  //初始化事件
  initEvents() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.MeasureStartEvent = new Cesium.Event(); //开始事件
    this.MeasureEndEvent = new Cesium.Event(); //结束事件
  }

  //激活
  activate() {
    this.deactivate();
    this.registerEvents(); //注册鼠标事件
    //设置鼠标状态
    this.viewer.enableCursorStyle = false;
    this.viewer._element.style.cursor = 'default';
    this.isMeasure = true;
    this.circleRadius = 0.1;
    this.measureHeight = 0;
    this.positions = [];
  }

  //禁用
  deactivate() {
    if (!this.isMeasure) return;
    this.unRegisterEvents();
    this.viewer._element.style.cursor = 'pointer';
    this.viewer.enableCursorStyle = true;
    this.isMeasure = false;
  }

  //清空绘制
  clear() {
    //清除线对象
    this.viewer.entities.remove(this.lineEntity);
    this.lineEntity = undefined;

    //清除文本
    this.viewer.entities.remove(this.labelEntity);
    this.labelEntity = undefined;

    //移除圆
    this.removeCircleEntity();

    //清除节点
    this.vertexEntities.forEach(item => {
      this.viewer.entities.remove(item);
    });
    this.vertexEntities = [];
  }

  //创建线对象
  createLineEntity() {
    this.lineEntity = this.viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(e => {
          return this.positions;
        }, false),
        width: 2,
        material: Cesium.Color.YELLOW,
        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.RED,
        }),
      }
    })
  }

  //创建结果文本标签
  createLabel() {
    this.labelEntity = this.viewer.entities.add({
      position: new Cesium.CallbackProperty(e => {
        return this.positions[this.positions.length - 1]; //返回最后一个点
      }, false),
      label: {
        text: "",
        scale: 0.5,
        font: 'normal 40px MicroSoft YaHei',
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
        scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        outlineWidth: 9,
        outlineColor: Cesium.Color.WHITE
      }
    })
  }

  //创建线节点
  createVertex(index) {
    let vertexEntity = this.viewer.entities.add({
      position: new Cesium.CallbackProperty(e => {
        return this.positions[index];
      }, false),
      type: "MeasureHeightVertex",
      point: {
        color: Cesium.Color.FUCHSIA,
        pixelSize: 6,
        // disableDepthTestDistance: 2000,
      },
    });
    this.vertexEntities.push(vertexEntity);
  }

  //创建圆 这样方便看出水平面的高低
  createCircleEntitiy() {
    this.circleEntity = this.viewer.entities.add({
      position: new Cesium.CallbackProperty(e => {
        return this.positions[this.positions.length - 1]; //返回最后一个点
      }, false),
      ellipse: {
        height: new Cesium.CallbackProperty(e => {
          return positionHeight(this.positions[this.positions.length - 1]);
        }, false),
        semiMinorAxis: new Cesium.CallbackProperty(e => {
          return this.circleRadius;
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(e => {
          return this.circleRadius;
        }, false),
        material: Cesium.Color.YELLOW.withAlpha(0.5),
      },
    });
  }

  //删除圆
  removeCircleEntity() {
    this.viewer.entities.remove(this.circleEntity);
    this.circleEntity = undefined;
  }

  //注册鼠标事件
  registerEvents() {
    this.leftClickEvent();
    this.rightClickEvent();
    this.mouseMoveEvent();
  }

  //左键点击事件
  leftClickEvent() {
    //单击鼠标左键画点点击事件
    this.handler.setInputAction(e => {
      this.viewer._element.style.cursor = 'default';
      let position = this.viewer.scene.pickPosition(e.position);
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(e.position, ellipsoid);
      }
      if (!position) return;

      if (this.positions.length == 0) { //首次点击
        this.positions.push(position);
        this.createVertex(0);
        this.createLineEntity();
        this.createCircleEntitiy();
        this.createLabel();
      } else { //第二次点击结束测量
        this.measureEnd();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  //鼠标移动事件
  mouseMoveEvent() {
    this.handler.setInputAction(e => {
      if (!this.isMeasure) return;
      this.viewer._element.style.cursor = 'default';
      let position = this.viewer.scene.pickPosition(e.endPosition);
      if (!position) {
        position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!position) return;
      this.handleMoveEvent(position);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  //处理鼠标移动
  handleMoveEvent(position) {
    if (this.positions.length < 1) return;
    let firstPoint = cartesian3Point3(this.positions[0]); //第一个点
    let movePoint = cartesian3Point3(position); //鼠标移动点
    const h = movePoint[2] - firstPoint[2];
    firstPoint[2] = movePoint[2];
    const twoPosition = Cesium.Cartesian3.fromDegrees(firstPoint[0], firstPoint[1], movePoint[2]);
    if (this.positions.length < 2) {
      this.positions.push(twoPosition);
      this.createVertex(1);
    } else {
      this.positions[1] = twoPosition;
      this.measureHeight = h.toFixed(3);
      this.labelEntity.label.text = "高度：" + this.measureHeight + " 米"
    }
    //计算圆的半径
    this.circleRadius = getDistanceH(this.positions[0], position);
  }

  //右键事件
  rightClickEvent() {
    this.handler.setInputAction(e => {
      if (this.isMeasure) {
        this.deactivate();
        this.clear();
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  //测量结束
  measureEnd() {
    this.deactivate();
    this.MeasureEndEvent.raiseEvent(this.measureHeight); //触发结束事件 传入结果
  }

  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Measure/Distance/Distance.js
/**
 * @name: Distance
 * @author: wangwei
 * @date: 2022/9/29 11:11
 * @description：Distance
 * @update: 2022/9/29 11:11
 */
//距离测量类
class MeasureDistance {
  constructor(viewer) {
    this.viewer = viewer;
    this.initEvents();
    this.positions = [];
    this.tempPositions = [];
    this.vertexEntities = [];
    this.labelEntity = undefined;
    this.measureDistance = 0; //测量结果
  }

  //初始化事件
  initEvents() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.MeasureStartEvent = new Cesium.Event(); //开始事件
    this.MeasureEndEvent = new Cesium.Event(); //结束事件
  }

  //激活
  activate() {
    this.deactivate();
    this.registerEvents(); //注册鼠标事件
    //设置鼠标状态
    this.viewer.enableCursorStyle = false;
    this.viewer._element.style.cursor = 'crosshair';
    this.isMeasure = true;
    this.measureDistance = 0;
  }

  //禁用
  deactivate() {
    if (!this.isMeasure) return;
    this.unRegisterEvents();
    this.viewer.enableCursorStyle = true;
    this.isMeasure = false;
    this.tempPositions = [];
    this.positions = [];
  }

  //清空绘制
  clear() {
    //清除线对象
    this.viewer.entities.remove(this.lineEntity);
    this.lineEntity = undefined;

    //清除节点
    this.vertexEntities.forEach(item => {
      this.viewer.entities.remove(item);
    });
    this.vertexEntities = [];
  }

  //创建线对象
  createLineEntity() {
    this.lineEntity = this.viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(e => {
          return this.tempPositions;
        }, false),
        width: 2,
        material: Cesium.Color.YELLOW,
        depthFailMaterial: Cesium.Color.YELLOW
      }
    })
  }

  //创建线节点
  createVertex() {
    let vertexEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      id: "MeasureDistanceVertex" + this.positions[this.positions.length - 1],
      type: "MeasureDistanceVertex",
      label: {
        text: this.getSpaceDistance(this.positions) + "米",
        scale: 0.5,
        font: 'normal 24px MicroSoft YaHei',
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
        scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        outlineWidth: 9,
        outlineColor: Cesium.Color.WHITE
      },
      point: {
        color: Cesium.Color.FUCHSIA,
        pixelSize: 8,
        disableDepthTestDistance: 500,
      },
    });
    this.vertexEntities.push(vertexEntity);
  }

  //创建起点
  createStartEntity() {
    let vertexEntity = this.viewer.entities.add({
      position: this.positions[0],
      type: "MeasureDistanceVertex",
      billboard: {
        image: "static/img/start.png",
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      point: {
        color: Cesium.Color.FUCHSIA,
        pixelSize: 6,
      },
    });
    this.vertexEntities.push(vertexEntity);
  }

  //创建终点节点
  createEndEntity() {
    //结束时删除最后一个节点的距离标识
    let lastLabel = this.viewer.entities.getById("MeasureDistanceVertex" + this.positions[this.positions.length - 1]);
    this.viewer.entities.remove(lastLabel);
    this.viewer.entities.remove(this.moveVertexEntity);

    let vertexEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      type: "MeasureDistanceVertex",
      label: {
        text: "总距离：" + this.getSpaceDistance(this.positions) + "米",
        scale: 0.5,
        font: 'normal 26px MicroSoft YaHei',
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
        scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -50),
        outlineWidth: 9,
        outlineColor: Cesium.Color.WHITE,
        eyeOffset: new Cesium.Cartesian3(0, 0, -10)
      },
      billboard: {
        image: "static/img/end.png",
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      point: {
        color: Cesium.Color.FUCHSIA,
        pixelSize: 6,
      },
    });
    this.vertexEntities.push(vertexEntity);
  }

  //空间两点距离计算函数
  getSpaceDistance(positions) {
    var distance = 0;
    for (var i = 0; i < positions.length - 1; i++) {
      var point1cartographic = Cesium.Cartographic.fromCartesian(
        positions[i]
      );
      var point2cartographic = Cesium.Cartographic.fromCartesian(
        positions[i + 1]
      );
      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //返回两点之间的距离
      s = Math.sqrt(
        Math.pow(s, 2) +
        Math.pow(point2cartographic.height - point1cartographic.height, 2)
      );
      distance = distance + s;
    }
    return distance.toFixed(2);
  }

  //注册鼠标事件
  registerEvents() {
    this.leftClickEvent();
    this.rightClickEvent();
    this.mouseMoveEvent();
  }

  //左键点击事件
  leftClickEvent() {
    //单击鼠标左键画点点击事件
    this.handler.setInputAction(e => {
      this.viewer._element.style.cursor = 'crosshair';
      let position = this.viewer.scene.pickPosition(e.position);
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(e.position, ellipsoid);
      }
      if (!position) return;
      this.positions.push(position);
      if (this.positions.length == 1) { //首次点击
        this.createLineEntity();
        this.createStartEntity();
        return;
      }
      this.createVertex();

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  //鼠标移动事件
  mouseMoveEvent() {
    this.handler.setInputAction(e => {
      if (!this.isMeasure) return;
      this.viewer._element.style.cursor = 'pointer';
      let position = this.viewer.scene.pickPosition(e.endPosition);
      if (!position) {
        position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!position) return;
      this.handleMoveEvent(position);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  //处理鼠标移动
  handleMoveEvent(position) {
    if (this.positions.length < 1) return;
    this.tempPositions = this.positions.concat(position);
  }

  //右键事件
  rightClickEvent() {
    this.handler.setInputAction(e => {
      if (!this.isMeasure || this.positions.length < 1) {
        this.deactivate();
        this.viewer._element.style.cursor = 'default';
        this.clear();
      } else {
        this.createEndEntity();
        this.lineEntity.polyline = {
          positions: this.positions,
          width: 2,
          material: Cesium.Color.YELLOW,
          depthFailMaterial: Cesium.Color.YELLOW
        };
        this.measureEnd();
      }

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  //测量结束
  measureEnd() {
    this.deactivate();
    this.viewer._element.style.cursor = 'default';
    this.MeasureEndEvent.raiseEvent(this.measureDistance); //触发结束事件 传入结果
  }

  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Measure/Measure.js




;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/Map3dTools/Map3dTools.js

var Measure = Measure_namespaceObject

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/utils/measure.js
/**
 * @name: measure
 * @author: wangwei
 * @date: 2022/9/29 9:38
 * @description：测量工具
 * @update: 2022/9/29 9:38
 */



class MeasureTools {
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
        this.mdTool = new Measure.Distance(this.viewer);
        this.measureDistance()
        break;
      case "area":
        this.maTool = new Measure.Area(this.viewer);
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



;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/DTH/FD/Fd.js
class Fd {

  /**
   * @param {Object} viewer
   * @param {Object} fd 分栋对象，一般传geoserver wfs请求的json数据
   */
  constructor(viewer, fd, position) {
    this.viewer = viewer,
      this.mouseClickPosition = void 0,
      this.fdDataServerBaseUrl = fd.fdDataServerBaseUrl,
      this.BuildingSelectedEvent = new Cesium.Event(),
      this.position = position,
      this.fid = undefined,
      this.initEvents();
  }

  /**
   * 注册事件
   */
  initEvents() {
    var that = this;
    if (that.position == null) {
      new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas).setInputAction(function (movenment) {
        that.isActivate && (that.BuildingSelectedEvent.raiseEvent(void 0),
          (movenment = that.viewer.scene.pickPosition(movenment.position)) && (that.mouseClickPosition = movenment,
            movenment = Cesium.Cartographic.fromCartesian(movenment),
            movenment = [Cesium.Math.toDegrees(movenment.longitude),
              Cesium.Math.toDegrees(movenment.latitude)],
            that.queryByPoint(movenment))
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    } else {
      that.queryByPoint(that.position, 1);
    }
  }

  /**
   * 查询点
   */
  queryByPoint(position, flag) {
    console.log(position);
    var that = this
    var url = this.fdDataServerBaseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (res) {
      // if (res.totalFeatures) {
      that.handleQueryResult(res, flag, position);
      // } else {
      // that.getFysqfw(position, flag)
      // }
    }).catch(function (error) {
      console.log(error);
    });
  }

  /**
   * 不是单栋的情况
   * 查询防疫三区范围面
   */
  // getFysqfw(position, flag) {
  //   const that = this;
  //   const baseUrl = 'http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Afysqfw&maxFeatures=5000&outputFormat=application%2Fjson'
  //   const url = baseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
  //   fetch(url).then(function (data) {
  //     return data.json();
  //   }).then(function (res) {
  //     console.log(res, 'mmmmm');
  //     // that.handleQueryResult(res, flag);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }

  /**
   * 处理查询结果
   */
  handleQueryResult(featureCollection, flag, position) {

    const baseUrl = 'http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Afysqfw&maxFeatures=5000&outputFormat=application%2Fjson'
    const url = baseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';

    let _this = this
    fetch(url).then(function (data) {
      return data.json();
    }).then(function (res) {
      // 该房屋所在防控范围
      let allType = []
      let areaTypeColor = ''
      res.features.forEach(item => {
        allType.push(item.properties.type)
      })
      if (allType.length && allType.indexOf('封控区') > -1) {
        areaTypeColor = 'RED'
      } else if (allType.indexOf('管控区') > -1) {
        areaTypeColor = 'ORANGE'
      } else if (allType.indexOf('防范区') > -1) {
        areaTypeColor = 'YELLOW'
      } else {
        areaTypeColor = 'CYAN'
      }

      // _this.clearQueryResult();
      let feature = featureCollection.features[0];
      if (feature) {
        let et = window.viewer.entities.getById('dth' + feature.id)

        if (et) {
          // 已经存在就删除
          window.viewer.entities.remove(et)
        } else {
          _this.fid = feature.id
          featureCollection = feature.geometry,
            feature = feature.properties,
            _this.BuildingSelectedEvent.raiseEvent(feature, _this.mouseClickPosition);
          let posArr = [];
          const pointArr = [];
          'MultiPolygon' === featureCollection.type ?
            posArr = featureCollection.coordinates[0][0] : 'Polygon' == featureCollection.type
            && (posArr = featureCollection.coordinates[0]);
          for (let i = 0; i < posArr.length; i++) {
            const p = posArr[i]
            pointArr.push(p[0])
            pointArr.push(p[1])
            pointArr.push(0)
          }
          _this.addClampFeature(pointArr, flag, areaTypeColor);
        }
      }
    })
  }

  /**
   * 添加数据
   * 传个颜色 动态房屋颜色
   */
  addClampFeature(pointArr, flag, areaTypeColor) {
    this.clampFeature = this.viewer.entities.add({
      id: 'dth' + this.fid,
      'polygon': {
        'hierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)),
        'classificationType': Cesium.ClassificationType.CESIUM_3D_TILE,
        'material': Cesium.Color[areaTypeColor].withAlpha(0.5)
      }
    })
    //如果是查询就定位
    if (flag == 1) {
      window.viewer.flyTo(this.clampFeature, {
        duration: 1.5,
        offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90.0), 10)
      })
    }
  }

  /**
   * 清除数据
   */
  clearQueryResult() {
    if (this.clampFeature) {
      this.viewer.entities.remove(this.clampFeature);
      this.clampFeature = {}
    }
    // this.clampFeature && (this.viewer.entities.remove(this.clampFeature),this.clampFeature = void 0);
  }

  activate() {
    this.isActivate = true;
  }

  deactivate() {
    this.isActivate = false;
  }

}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/utils/styleInit.js
class styleInit {
  /**
   * @param
   */
  constructor(style, nullObj) {
    void 0 === nullObj && (nullObj = {});
    var _0x1d9fe3, _0x4a62b4 = nullObj.insertAt;
    style && 'undefined' != typeof document && (_0x1d9fe3 = document.head || document.getElementsByTagName('head')[0],
      (nullObj = document.createElement('style')).type = 'text/css',
      'top' === _0x4a62b4 && _0x1d9fe3.firstChild ? _0x1d9fe3.insertBefore(nullObj, _0x1d9fe3.firstChild) : _0x1d9fe3.appendChild(nullObj),
      nullObj.styleSheet ? nullObj.styleSheet.cssText = style : nullObj.appendChild(document.createTextNode(style)));
  }
}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/DTH/FC/Fc.js


class Fc{

  /**
   * @param {Object} viewer
   * @param {Object} fc 分栋对象，一般传geoserver wfs请求的json数据
   */
  constructor(viewer,fc){
    this.viewer = viewer,
    this.fcPrimitives = [],
    this.fcDataServerBaseUrl = fc.fcDataServerBaseUrl,
    this.FloorSelectedEvent = new Cesium.Event(),
    this.initEvents();
  }
	/**
	 * 注册事件
	 */
	initEvents(){
		var that = this;
		new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas).setInputAction(function(pick) {
		  if (that.isActivate) {
		    that.FloorSelectedEvent.raiseEvent(void 0);
		    var property = that.viewer.scene.pick(pick.position);
		    if (property) {
          if (property.primitive && property.primitive instanceof Cesium.ClassificationPrimitive)
            return void that.handlePickFloor(property);
          if (property.id && 'highlightFloorEntity' == property.id.type)
            return;
		    }
		    pick = that.viewer.scene.pickPosition(pick.position),
		    pick && (pick = Cesium.Cartographic.fromCartesian(pick),
		    pick = [Cesium.Math.toDegrees(pick.longitude), Cesium.Math.toDegrees(pick.latitude)],
		    that.queryByPoint(pick));
		  }
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	/**
	 * 查询点
	 */
	queryByPoint(position){
		var that = this
		var fcDataServerBaseUrl = this.fcDataServerBaseUrl + '&filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + position[0] + ',' + position[1] + '</gml:coordinates></gml:Point></Intersects></Filter>';
    fetch(fcDataServerBaseUrl).then(function(res) {
		    return res.json();
		}).then(function(res) {
		    that.handleQueryResult(res);
		}).catch(function(error) {
		  console.log(error);
		});
	}

  /**
	 * 处理查询结果
	 */
	handleQueryResult(result){
		var that = this;
		that.clearPrimitives(),
		result.features.length < 1 || (that.queryResultFeatures = result.features,
		result.features.forEach(function(primitive) {
		  that.addPrimitive(primitive);
		}));
	}

  /**
   * 添加primitive
   */
  addPrimitive(primitive){
    var property = primitive.properties;
    primitive = turf.buffer(primitive, 0.8, {
      'units': 'meters'
    }),
    (primitive = this.getDegreesArrayHeights(primitive),
    primitive = new Cesium.PolygonGeometry({
        'polygonHierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(primitive)),
        'perPositionHeight': true,
        'extrudedHeight': property.BaseHeight + property.FloorHeigh
    }),
    property = property.BuildCode + property.FloorNumbe,
    primitive = this.createExtrudedPolygon(property, primitive)),
    this.fcPrimitives.push(primitive);
  }

  /**
   * 清除primitive
   */
  clearPrimitives(){
    var that = this;
    this.fcPrimitives.forEach(function(primitive) {
        that.viewer.scene.primitives.remove(primitive);
    }),
    this.fcPrimitives = [],
    this.viewer.entities.remove(this.highlightFloorEntity);
  }

  /**
   * 创建突出面
   */
  createExtrudedPolygon(id, geometry){
    return this.viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
        'geometryInstances': new Cesium.GeometryInstance({
            'geometry': Cesium.PolygonGeometry.createGeometry(geometry),
            'attributes': {
                'color': Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
                    'alpha': 0.8
                })),
                'show': new Cesium.ShowGeometryInstanceAttribute(true)
            },
            'id': id
        }),
        'classificationType': Cesium.ClassificationType.CESIUM_3D_TILE
    }));
  }

  /**
   * 获取坐标数组的高度数组
   */
  getDegreesArrayHeights(feature){
    var heightArr = []
      , coordinateArr = void 0;
    'MultiPolygon' == feature.geometry.type ? coordinateArr = feature.geometry.coordinates[0][0] :
    'Polygon' == feature.geometry.type && (coordinateArr = feature.geometry.coordinates[0]);
    for (var i = 0; i < coordinateArr.length; i++) {
        var coordinate = coordinateArr[i];
        heightArr.push(coordinate[0]),
        heightArr.push(coordinate[1]),
        heightArr.push(feature.properties.BaseHeight);
    }
    return heightArr;
  }

  /**
   * 处理选中结果
   */
  handlePickFloor(pickObj){
    this.clickHighlightPrimitive && (this.clickHighlightPrimitive.show = true),
    pickObj.primitive.show = false,
    this.clickHighlightPrimitive = pickObj.primitive;
    var feature = this.getFeatureByPrimitiveId(pickObj.id);
    this.FloorSelectedEvent.raiseEvent(feature),
    feature = turf.buffer(feature, 1, {
        'units': 'meters'
    }),
    this.viewer.entities.remove(this.highlightFloorEntity),
    pickObj = this.getDegreesArrayHeights(feature),
    this.highlightFloorEntity = this.viewer.entities.add({
      'type': 'highlightFloorEntity',
      'polygon': {
        'hierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pickObj)),
        'perPositionHeight': true,
        'extrudedHeight': feature.properties.BaseHeight + feature.properties.FloorHeigh,
        'material': Cesium.Color.RED.withAlpha(0.7)
      }
    });
  }

  /**
   * 根据id查询feature
   */
  getFeatureByPrimitiveId(code){
    for (var i = 0; i < this.queryResultFeatures.length; i++) {
      var properties = this.queryResultFeatures[i].properties;
      if (properties.BuildCode + properties.FloorNumbe == code)
        return this.queryResultFeatures[i];
    }
  }

  /**
   * 注册样式
   */
  setStyle(){
    var style = '.MultiFieldAdaptWindow-container {position: absolute;left: 0px;bottom: 0px;min-width: 350px;min-height: 200px;color: white;}.MultiFieldAdaptWindow-container::before {position: absolute;content: "";top: 100%;left: calc(50% - 20px);border: 20px solid transparent;border-top: 40px solid rgba(30, 32, 42, 0.5);}.MultiFieldAdaptWindow-header {height: 30px;line-height: 30px;color: white;min-width: 200px;padding: 0px 10px;background: #1a4879;border-top-right-radius: 4px;border-top-left-radius: 4px;position: relative;user-select: none;}.MultiFieldAdaptWindow-close {position: absolute;right: 1px;font-size: 25px;cursor: pointer;width: 29px;text-align: center;}.MultiFieldAdaptWindow-close:hover {background: #dc2929b9;}.MultiFieldAdaptWindow-body {padding: 5px;background: linear-gradient( 0deg, rgba(30, 32, 42, 0.5), rgba(13, 16, 19, 0.7));border: 1px solid rgb(29, 26, 26);border-top: 0px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.MultiFieldAdaptWindow-info-item {margin: 14px 0px;max-width: 350px;}.MultiFieldAdaptWindow-ifno-label {display: inline-block;min-width: 60px;text-align: justify;text-align-last: justify;background: #fff6f625;}.MultiFieldAdaptWindow-ifno-text {background: #fff6f60e;}'
    styleInit(style,{})
  }

  activate(){
    this.isActivate = true;
  }

  deactivate(){
    this.isActivate = false;
  }


}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/lib/DTH/FH/Fh.js


class Fh {

  /**
   * @param {Object} viewer
   * @param {Object} fh 分栋对象，一般传geoserver wfs请求的json数据,分户建立在分层的基础上
   */
  constructor(viewer, fh) {
    this.viewer = viewer,
      this.fhPrimitives = [],
      this.fcDataServerBaseUrl = fh.fcDataServerBaseUrl,
      this.fhDataServerBaseUrl = fh.fhDataServerBaseUrl,
      this.HouseSelectedEvent = new Cesium.Event(),
      this.initEvents();
    this.setStyle();
  }

  /**
   * 注册事件
   */
  initEvents() {
    var that = this;
    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function (e) {
      if (that.isActivate) {
        var property = that.viewer.scene.pick(e.position);
        if (property) {
          if (property.primitive && property.primitive instanceof Cesium.ClassificationPrimitive)
            return void that.handlePickHouse(property);
          if (property.id && 'highlightFloorEntity' == property.id.type)
            return;
        }
        property = that.viewer.scene.pickPosition(e.position),
        property && (e = Cesium.Cartographic.fromCartesian(property),
          property = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)],
          that.queryByPoint(property, e.height));
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 查询点
   */
  queryByPoint(fcDataServerBaseUrl, height) {
    var that = this;
    this.mouseClickHeight = height,
      fcDataServerBaseUrl = this.fcDataServerBaseUrl + '&filter=<Filter\x20xmlns=\x22http://www.opengis.net/ogc\x22\x20xmlns:gml=\x22http://www.opengis.net/gml\x22><Intersects><PropertyName>the_geom</PropertyName><gml:Point><gml:coordinates>' + fcDataServerBaseUrl[0] + ',' + fcDataServerBaseUrl[1] + '</gml:coordinates></gml:Point></Intersects></Filter>',
      fetch(fcDataServerBaseUrl).then(function (res) {
        return res.json();
      }).then(function (res) {
        that.handleFcQueryResult(res);
      }).catch(function (error) {
        console.log(error);
      });
  }

  /**
   * 处理查询结果
   */
  handleFcQueryResult(res) {
    if (this.clearPrimitives(), this.HouseSelectedEvent.raiseEvent(void 0), !(res.features.length < 1)) {
      for (var _0x30f348, _0x38c1d3, _0x1c0a81 = void 0, i = 0; i < res.features.length; i++) {
        var feature = res.features[i];
        if (this.mouseClickHeight >= feature.properties.BaseHeight && this.mouseClickHeight <= feature.properties.TopHeight) {
          _0x1c0a81 = feature;
          break;
        }
      }
      console.log(_0x1c0a81)
      _0x1c0a81 && (_0x30f348 = _0x1c0a81.properties.BuildCode,
        _0x38c1d3 = _0x1c0a81.properties.FloorNumbe,
        this.queryBySQL(_0x30f348, _0x38c1d3));
    }
  }

  /**
   * SQL查询
   */
  queryBySQL(id, url) {
    var that = this, url = this.fhDataServerBaseUrl + '&cql_filter=BuildCode=' + id + '\x20and\x20FloorNumbe=' + url;
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (res) {
      console.log(res)
      that.handleFhQueryResult(res);
    }).catch(function (error) {
      console.log(error);
    });
  }

  /**
   * 处理分户查询结果
   */
  handleFhQueryResult(res) {
    var that = this;
    res.features.length < 1 ||
    (
      this.queryResultFeatures = res.features,
        res.features.forEach(function (e) {
          console.log(e)
          that.addPrimitive(e);
        })
    );
  }

  /**
   * 添加primitive对象
   */
  addPrimitive(primitive) {
    console.log(primitive)
    var propety = primitive.properties;
    primitive = turf.buffer(primitive, 0.8, {
      'units': 'meters'
    }),
      (primitive = this.getDegreesArrayHeights(primitive),
        primitive = new Cesium.PolygonGeometry({
          'polygonHierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(primitive)),
          'perPositionHeight': true,
          'extrudedHeight': propety.BaseHeight + propety.FloorHeigh
        }),
        propety = propety.BuildCode + propety.FloorNumbe + propety.HouseCode,
        primitive = this.createExtrudedPolygon(propety, primitive)),
      this.fhPrimitives.push(primitive);
  }

  /**
   * 清除primitive对象
   */
  clearPrimitives() {
    var that = this;
    this.fhPrimitives.forEach(function (primitive) {
      that.viewer.scene.primitives.remove(primitive);
    }),
      this.fhPrimitives = [],
      this.viewer.entities.remove(this.highlightFloorEntity);
  }

  /**
   * 创建突出面
   */
  createExtrudedPolygon(id, geometry) {
    return this.viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
      'geometryInstances': new Cesium.GeometryInstance({
        'geometry': Cesium.PolygonGeometry.createGeometry(geometry),
        'attributes': {
          'color': Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
            'alpha': 0.8
          })),
          'show': new Cesium.ShowGeometryInstanceAttribute(true)
        },
        'id': id
      }),
      'classificationType': Cesium.ClassificationType.CESIUM_3D_TILE
    }));
  }

  /**
   * 获取坐标数组高度数组
   */
  getDegreesArrayHeights(feature) {
    var heightArr = []
    var coordinateArr = void 0;
    'MultiPolygon' == feature.geometry.type ? coordinateArr = feature.geometry.coordinates[0][0] : 'Polygon' == feature.geometry.type && (coordinateArr = feature.geometry.coordinates[0]);
    for (var i = 0; i < coordinateArr.length; i++) {
      var point = coordinateArr[i];
      heightArr.push(point[0]),
        heightArr.push(point[1]),
        heightArr.push(feature.properties.BaseHeight);
    }
    return heightArr;
  }

  /**
   * 获取拾取或点击的对象
   */
  handlePickHouse(pickObj) {
    this.clickHighlightPrimitive && (this.clickHighlightPrimitive.show = true),
      pickObj.primitive.show = false,
      this.clickHighlightPrimitive = pickObj.primitive;
    var feature = this.getFeatureByPrimitiveId(pickObj.id);
    this.HouseSelectedEvent.raiseEvent(feature),
      feature = turf.buffer(feature, 1, {
        'units': 'meters'
      }),
      this.viewer.entities.remove(this.highlightFloorEntity),
      pickObj = this.getDegreesArrayHeights(feature),
      this.highlightFloorEntity = this.viewer.entities.add({
        'type': 'highlightFloorEntity',
        'polygon': {
          'hierarchy': new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(pickObj)),
          'perPositionHeight': true,
          'extrudedHeight': feature.properties.BaseHeight + feature.properties.FloorHeigh,
          'material': Cesium.Color.RED.withAlpha(0.7)
        }
      });
  }

  /**
   * 通过id查询feature
   */
  getFeatureByPrimitiveId(feature) {
    for (var i = 0; i < this.queryResultFeatures.length; i++) {
      var properties = this.queryResultFeatures[i].properties;
      if (properties.BuildCode + properties.FloorNumbe + properties.HouseCode == feature)
        return this.queryResultFeatures[i];
    }
  }

  /**
   * 注册样式
   */
  setStyle() {
    var style = '.MultiFieldAdaptWindow-container {position: absolute;left: 0px;bottom: 0px;min-width: 350px;min-height: 200px;color: white;}.MultiFieldAdaptWindow-container::before {position: absolute;content: "";top: 100%;left: calc(50% - 20px);border: 20px solid transparent;border-top: 40px solid rgba(30, 32, 42, 0.5);}.MultiFieldAdaptWindow-header {height: 30px;line-height: 30px;color: white;min-width: 200px;padding: 0px 10px;background: #1a4879;border-top-right-radius: 4px;border-top-left-radius: 4px;position: relative;user-select: none;}.MultiFieldAdaptWindow-close {position: absolute;right: 1px;font-size: 25px;cursor: pointer;width: 29px;text-align: center;}.MultiFieldAdaptWindow-close:hover {background: #dc2929b9;}.MultiFieldAdaptWindow-body {padding: 5px;background: linear-gradient( 0deg, rgba(30, 32, 42, 0.5), rgba(13, 16, 19, 0.7));border: 1px solid rgb(29, 26, 26);border-top: 0px;border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;}.MultiFieldAdaptWindow-info-item {margin: 14px 0px;max-width: 350px;}.MultiFieldAdaptWindow-ifno-label {display: inline-block;min-width: 60px;text-align: justify;text-align-last: justify;background: #fff6f625;}.MultiFieldAdaptWindow-ifno-text {background: #fff6f60e;}'
    new styleInit(style, {})
  }

  activate() {
    this.isActivate = true;
  }

  deactivate() {
    this.isActivate = false;
  }


}

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./cesium-rightclick-menu/cesium-rightclick-menu/src/FcDialog.vue?vue&type=template&id=39fde2cb&scoped=true&
var FcDialogvue_type_template_id_39fde2cb_scoped_true_render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',[_vm._v(" "+_vm._s(_vm.properties.FloorNumbe)+"层"+_vm._s(_vm.properties.Householde)+" ")])
}
var FcDialogvue_type_template_id_39fde2cb_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./cesium-rightclick-menu/cesium-rightclick-menu/src/FcDialog.vue?vue&type=script&lang=js&


/* harmony default export */ var FcDialogvue_type_script_lang_js_ = ({
  name: "FcDialog",
  props: ['properties'],
  data() {
    return {}
  },
  components: {},

  methods: {},

  computed: {},

  watch: {},

  mounted() {
  }
});

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/FcDialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_FcDialogvue_type_script_lang_js_ = (FcDialogvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/FcDialog.vue





/* normalize component */
;
var component = normalizeComponent(
  src_FcDialogvue_type_script_lang_js_,
  FcDialogvue_type_template_id_39fde2cb_scoped_true_render,
  FcDialogvue_type_template_id_39fde2cb_scoped_true_staticRenderFns,
  false,
  null,
  "39fde2cb",
  null
  
)

/* harmony default export */ var FcDialog = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue?vue&type=script&lang=js&








/* harmony default export */ var cesium_rightclick_menuvue_type_script_lang_js_ = ({
  name: "cesium-rightclick-menu",
  components: {
    FcDialog: FcDialog,
  },

  /**
   * 由引入该组件的父组件提供
   * toCenter 跳转到某一点
   * loadRegion 需要加载的面的地址
   * enableRightClickDeletion 是否开启右键删除图层
   * showDkInfo 左键点击显示图层信息
   */
  props: {
    toCenter: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    load3dTiles: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    loadRegion: {
      type: Function,
      default: function () {
        return () => {
        }
      }
    },
    enableRightClickDeletion: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    showDkInfo: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      alertMenuState: false,
      alertMenuStyle: {
        left: 0,
        top: 0,
      },
      menuList: [
        {
          label: '查看坐标',
          icon: 'icon-chakanzuobiao',
          handler: 'showClickedPosition'
        },
        {
          label: '场景服务', icon: 'icon-changjingjuanlian',
          children: [
            {label: '历史场景', icon: 'icon-lishijilu', handler: 'addSplitLayer', isSwitch: true, active: false},
            {label: '场景出图', icon: 'icon-xiangji1fill', handler: 'sceneToFile'}
          ]
        },
        {
          label: '视角切换', icon: 'icon-yanjing_xianshi',
          children: [
            {label: '地下开挖', icon: 'icon-xiayi', handler: 'initExcavate', isSwitch: true, active: false},
            {
              label: '环绕飞行',
              icon: 'icon-icon-feixingmanyou',
              handler: 'initFlyAround',
              isSwitch: true,
              active: false
            },
            {label: '第一视角', icon: 'icon-xingren', handler: 'initPeopleView', isSwitch: true, active: false},
            {label: '键盘漫游', icon: 'icon-jianpan', handler: 'initKeyboardTour', isSwitch: true, active: false}
          ]
        },
        {
          label: '地形分析', icon: 'icon-quanjing',
          children: [
            {label: '地形', icon: 'icon-yuanjing', handler: 'initTerrain', isSwitch: true, active: false},
            {label: '限高分析', icon: 'icon-jianzhu', handler: 'initLimitHeight', isSwitch: true, active: false},
            // {label: '填挖方分析', icon: 'icon-tianwafangfenxi', isSwitch: true, active: false},
            {
              label: '淹没分析',
              icon: 'icon-yanmeiguocheng',
              handler: 'initFloodAnalysis',
              isSwitch: true,
              active: false
            }
          ]
        }, {
          label: '图上量算', icon: 'icon-celiang',
          children: [
            {label: '距离', icon: 'icon-juliceliang', handler: 'measureDistance'},
            {label: '面积', icon: 'icon-mianji', handler: 'measureArea'},
            {label: '高度', icon: 'icon-colum-height', handler: 'measureHeight'},
            // {label: '角度', icon: 'icon-a-ziyuan126', handler: 'measureDistance'},
            {label: '清除', icon: 'icon-shanchu', handler: 'measureClear'}
          ]
        }, {
          label: '图上标记', icon: 'icon-Markerbiaoji',
          children: [
            {label: '标记点', icon: 'icon-weizhi', handler: 'addMarkerPoint'},
            {label: '标记线', icon: 'icon-xianduan', handler: 'addMarkerLine'},
            {label: '标记面', icon: 'icon-polygon-fill', handler: 'addMarkerPolygon'},
            {label: '标记圆', icon: 'icon-ditu-yuan', handler: 'addMarkerCircular'},
            {label: '标记矩形', icon: 'icon-rect', handler: 'addMarkerRectangle'},
            {label: '清除', icon: 'icon-shanchu', handler: 'clearMarkers'}
          ]
        }, {
          label: '场景效果', icon: 'icon-zaixinqiumianchangjingchuangkoudakai',
          children: [
            {label: '下雨', icon: 'icon-shui', handler: 'startRain', isSwitch: true, active: false},
            {label: '下雪', icon: 'icon-xue', handler: 'startSnow', isSwitch: true, active: false},
            {label: '雾', icon: 'icon-wu', handler: 'startFog', isSwitch: true, active: false},
            {label: '夜视', icon: 'icon-yeshi', handler: 'startNightVision', isSwitch: true, active: false},
            {label: '黑白', icon: 'icon-heibai', handler: 'startB_W', isSwitch: true, active: false}
          ]
        }
      ],
      activeMenuList: [],
      menu_level2Style: {},
      activeIndex: null,
      activeSubIndex: 0,
      rightClickedPosition: null,
      sliderShow: false,
      splitHandler: null,
      earthAtRightLayer: null,
      terrainExcavate: null,
      excavateDepth: null,
      isEditing: false,
      limitHeight: null,
      limitHeightShow: false,
      height: 30,
      maTool: null,
      mhTool: null,
      mdTool: null,
      markersArr: [],
      properties: null,
      highlightFace: null,
      delDialogShow: false,
      activeEntity: null,
      dkInfoDialogShow: false,
      propertiesObj: {},
      videoPlane: null,
      positionEntity: null
    }
  },

  methods: {
    initMap() {
      const viewerOption = {
        navigation: false,
        sceneModePicker: false,
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        baseLayerPicker: false, // 底图切换控件
        animation: false, // 控制场景动画的播放速度控件
        infoBox: false,//关闭自带弹窗,
        shouldAnimate: true,//开启漫游
        selectionIndicator: false,
        contextOptions: {
          webgl: {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            //通过canvas.toDataURL()实现截图
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
          }
        },
        // 提供一个默认图片避免加载cesiumendpoint接口
        // imageryProvider: new Cesium.SingleTileImageryProvider({
        //   url: require('./imgs/img.png'),
        // })
      }
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMWRhNjczZi1jODI2LTQzMTctYWM3Mi0yOTcwNjE4MmJhY2YiLCJpZCI6NzE0MzgsImlhdCI6MTYzOTk4MjEyMH0.RbSKlFOzNyLXNnFfq631lXEGMJzMYL0RzGhOUvnlZBY';
      let viewer = new Cesium.Viewer('map3d', viewerOption)
      viewer._cesiumWidget._creditContainer.style.display = "none"// 隐藏版权
      viewer.scene.globe.depthTestAgainstTerrain = true

      //线下影像
      const tms = new Cesium.UrlTemplateImageryProvider({
        url: Cesium.buildModuleUrl('http://120.27.230.6/tdt_yx') + '/{z}/{x}/{reverseY}.jpg',
        tilingScheme: new Cesium.GeographicTilingScheme(),
        maximumLevel: 19
      })

      let earthAtLeft = viewer.imageryLayers.addImageryProvider(tms)
      earthAtLeft.ImagerySplitDirection = Cesium.ImagerySplitDirection.LEFT;
      // 导航控件
      // let pInfoStatusBar = new xt3d.SceneControl.PositionInfoStatusBar(viewer);
      window.viewer = viewer;
      this.toCenter && this.toCenter()
      this.loadRegion && this.loadRegion()
      this.load3dTiles &&this.load3dTiles()
    },
    initRightClick() {
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)
      let that = this
      handler.setInputAction(function (click) {
        that.activeIndex = null
        // that.activeMenuList = []
        that.rightClickedPosition = cartesian2ToXyz(click.position, window.viewer)
        const pickedFeature = window.viewer.scene.pick(click.position)

        // 点击到了entity
        if (pickedFeature && pickedFeature.id) {
          if (that.enableRightClickDeletion) {
            that.activeEntity = pickedFeature.id
            // 高亮显示
            if (that.highlightFace) {
              that.highlightFace.material = that.highlightFace.material0;
            }
            pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material;
            pickedFeature.id.polygon.material = Cesium.Color.AQUA.withAlpha(0.5);
            that.highlightFace = pickedFeature.id.polygon;

            that.delDialogShow = true
          }
        } else {
          // 获取右键点击时，菜单栏出现的位置
          if (!that.isEditing) {
            that.alertMenuStyle = disPlayPositionCtrl(
              click.position.x, // 屏幕坐标x
              click.position.y, // 屏幕坐标y
              that.$refs.alertMenu.clientWidth, // 菜单栏宽度
              that.$refs.alertMenu.clientHeight // 菜单栏高度
            );
            // 显示右键菜单栏
            that.showOrHiddenRightClickMenu(true);
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    initLeftClick() {
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
      handler.setInputAction((click) => {
        const pickedFeature = window.viewer.scene.pick(click.position);
        this.showOrHiddenRightClickMenu(false);
        // 取消高亮
        if (this.highlightFace) {
          this.highlightFace.material = this.highlightFace.material0;
        }

        //显示图层信息
        if (pickedFeature && pickedFeature.id && pickedFeature.id.canShow) {
          this.activeEntity = pickedFeature.id
          pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material;
          pickedFeature.id.polygon.material = Cesium.Color.AQUA;
          this.highlightFace = pickedFeature.id.polygon;
          this.showDkInfo && this.showDkInfos()
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    showDkInfos() {
      this.dkInfoDialogShow = true
      let entity = this.activeEntity
      this.propertiesObj = entity.propertiesObj
    },

    changeActiveEntityColor(args) {
      let color = getColor(args[0])
      this.activeEntity.polygon.material = Cesium.Color.fromCssColorString(color)
      this.activeEntity.label = getLabelObj(args[1])
    },
    handleDkInfoClose() {
      this.dkInfoDialogShow = false
      if (this.highlightFace) {
        this.highlightFace.material = this.highlightFace.material0;
      }
    },
    onCancel() {
      this.delDialogShow = false
    },
    onDelete() {
      //TODO
      window.viewer.entities.remove(this.activeEntity)
      this.delDialogShow = false
    },
    showOrHiddenRightClickMenu(state) {
      this.alertMenuState = state;
    },
    handleHover(index) {
      this.activeIndex = index
      this.activeSubIndex = 0
      let dom = this.$refs[`menuItem${index}`]

      this.menu_level2Style = {
        marginTop: dom[0].offsetTop + 'px'
      }

      this.activeMenuList = this.menuList[index].children
    },
    handleSubHover(index) {
      this.activeSubIndex = index
    },
    executionMethod(fun, index) {
      if (index !== undefined && index.toString()) {
        this.activeMenuList[index].active = !this.activeMenuList[index].active
      }
      // 方法执行
      fun && this[fun]()

      this.showOrHiddenRightClickMenu(false)
    },
    showClickedPosition() {
      window.viewer.entities.remove(this.positionEntity)
      this.positionEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(this.rightClickedPosition.lng, this.rightClickedPosition.lat),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 8,
        }
      })
      window.viewer.entities.add(this.positionEntity)
      let str = this.rightClickedPosition.lng + ',' + this.rightClickedPosition.lat
      addLabelText(this.positionEntity, 'Point', str)
    },
    sceneToFile() {
      sceneToFile(window.viewer)
    },
    addSplitLayer() {
      let layer1 = new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        minimumLevel: 1,
        maximumLevel: 18,
      });
      if (this.sliderShow) {
        this.splitHandler.destroy()
        this.splitHandler = null
        window.viewer.imageryLayers.remove(this.earthAtRightLayer)
        this.sliderShow = false
      } else {
        this.sliderShow = true
        this.$nextTick(() => {
          // const layer2 = new Cesium.UrlTemplateImageryProvider({
          //   url: "Cesium.buildModuleUrl('http://120.27.230.6/tdt_yx') + '/{z}/{x}/{reverseY}.jpg'",
          //   minimumLevel: 1,
          //   maximumLevel: 18,
          // });
          const layers = window.viewer.imageryLayers;
          const earthAtRight = layers.addImageryProvider(layer1);
          this.earthAtRightLayer = earthAtRight
          // const earthAtLeft = layers.addImageryProvider(layer2);
          // earthAtLeft.splitDirection = Cesium.ImagerySplitDirection.LEFT;
          earthAtRight.splitDirection = Cesium.ImagerySplitDirection.RIGHT;

          const slider = document.getElementById("slider");
          if (slider) {
            window.viewer.scene.imagerySplitPosition =
              slider.offsetLeft / slider.parentElement.offsetWidth;

            const handler = new Cesium.ScreenSpaceEventHandler(slider);
            this.splitHandler = handler

            let moveActive = false;

            function move(movement) {
              if (!moveActive) {
                return;
              }

              const relativeOffset = movement.endPosition.x;
              const splitPosition =
                (slider.offsetLeft + relativeOffset) /
                slider.parentElement.offsetWidth;
              slider.style.left = `${100.0 * splitPosition}%`;
              window.viewer.scene.imagerySplitPosition = splitPosition;
            }

            handler.setInputAction(function () {
              moveActive = true;
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
            handler.setInputAction(function () {
              moveActive = true;
            }, Cesium.ScreenSpaceEventType.PINCH_START);

            handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

            handler.setInputAction(function () {
              moveActive = false;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
            handler.setInputAction(function () {
              moveActive = false;
            }, Cesium.ScreenSpaceEventType.PINCH_END)
          }
        })
      }
    },
    //初始化开挖
    initExcavate() {
      if (this.terrainExcavate) {
        this.terrainExcavate.clear()
        this.terrainExcavate = null
        let et = window.viewer.entities.getById('Polygon_Label')
        window.viewer.entities.remove(et)
      } else {
        this.isEditing = true
        this.terrainExcavate = new xt3d.ExcavateAnalysis.TerrainExcavate(window.viewer);
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove();
          addLabelText(result, 'Polygon', '开挖测试')
          this.$prompt('请输入大于0的数字', '开挖深度', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            inputErrorMessage: '数字格式不正确'
          }).then(({value}) => {
            this.terrainExcavate.add(positions, {
              excavateDepth: value,
              bottomImage: __webpack_require__(838),
              sideImage: __webpack_require__(186)
            })
            this.isEditing = false
          }).catch(() => {
            if (this.terrainExcavate) {
              this.terrainExcavate.clear()
              this.terrainExcavate = null
            }
            let et = window.viewer.entities.getById('Polygon_Label')
            window.viewer.entities.remove(et)
            this.activeMenuList[0].active = false
            this.isEditing = false
          })
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          if (this.terrainExcavate) {
            this.terrainExcavate.clear()
            this.terrainExcavate = null
          }
          let et = window.viewer.entities.getById('Polygon_Label')
          window.viewer.entities.remove(et)
          this.activeMenuList[0].active = false
          this.isEditing = false
        })
      }
    },
    initFlyAround() {
      if (this.windingPoint) {
        this.windingPoint.deactivate()
        window.viewer.entities.removeById('flyPoint')
        this.windingPoint = null
      } else {
        let note = this.$notify({
          title: '提示',
          message: '点击左键进行选点，围绕该点进行环绕飞行',
          duration: 0
        })
        this.initEntityDraw()
        this.drawActivate('Point')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          note.close()
          result.remove()
          window.viewer.entities.add({
            id: 'flyPoint',
            position: positions[0],
            point: {
              pixelSize: 4,
              color: Cesium.Color.RED,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
          })
          this.windingPoint = new xt3d.CameraDominate.WindingPoint(window.viewer, positions[0])
          this.windingPoint.activate()
        })
      }
    },

    // 漫游轨迹
    initPeopleView() {
      if (this.roamObj) {
        this.roamObj.stop()
        this.roamObj = null
        window.viewer.entities.removeById('romaLine')
      } else {
        let note = this.$notify({
          title: '提示',
          message: '请先绘制运动路径',
          duration: 0
        })
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polyline')

        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {

          this.isEditing = false
          note.close()
          result.remove()

          window.viewer.entities.add({
            id: 'romaLine',
            polyline: {
              positions: new Cesium.CallbackProperty(e => {
                return positions;
              }, false),
              width: 3,
              material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.YELLOW,
              }),
              depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.YELLOW,
              }),
            }
          })

          //创建漫游对象
          this.roamObj = new xt3d.TrackRoam.Roam(window.viewer, positions, {
            speed: 10,
            modelUrl: 'static/img/CesiumMilkTruck.glb',
            scale: 1, // 大小
            role: 2
          })
          this.roamObj.start()
        })
      }
    },

    //键盘漫游
    initKeyboardTour() {
      if (this.keyboardModel) {
        this.keyboardModel.deactivate()
        this.keyboardModel = null
      } else {
        let note = this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: '点击左键选择起点，使用' +
            '<span style="color: darkcyan">W</span>（前进）' +
            '<span style="color: darkcyan">A</span>（左转）' +
            '<span style="color: darkcyan">S</span>（后退）' +
            '<span style="color: darkcyan">D</span>（右转）进行控制',
          duration: 0
        })
        this.initEntityDraw()
        this.drawActivate('Point')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          note.close()
          result.remove()
          this.keyboardModel = new xt3d.KeyboardDominate.KeyboardModelExt(window.viewer, positions[0], {
            modelUrl: "static/img/CesiumMilkTruck.glb",
            scale: 1,
            minimumPixelSize: 20,
            angle: 1, //转弯角度大小 越大转得越快
            speed: 1, //速度,
            role: 1, //0 自由视角 1 第一视角
            aotuPickHeight: false //是否拾取高度
          })
          this.keyboardModel.activate()
        })
      }
    },
    initTerrain() {
      //线下高程
      if (window.viewer.terrainProvider._scheme) {
        viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
      } else {
        window.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
          url: "http://120.27.230.6/yhterrain",
        });
      }
    },
    valueChange() {
      this.limitHeight && this.limitHeight.setHeight(this.height);
    },
    initLimitHeight() {
      if (this.limitHeight) {
        this.limitHeight.remove()
        this.limitHeight = null
        this.limitHeightShow = false
      } else {
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove();
          let arr = []
          positions.forEach(item => {
            let obj = cartesian3ToXyz(item, window.viewer)
            arr.push(obj.lng)
            arr.push(obj.lat)
          })
          this.limitHeightShow = true
          this.limitHeight = new xt3d.SpatialAnalysis.LimitHeight(window.viewer, arr, 30);
          this.isEditing = false
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          this.limitHeight.remove()
          this.limitHeight = null
          this.limitHeightShow = false
          this.isEditing = false
        })
      }
    },
    initFloodAnalysis() {
      const {viewer} = window
      if (viewer.entities.getById('floodEntity')) {
        viewer.entities.remove(viewer.entities.getById('floodEntity'))
      } else {
        this.isEditing = true
        this.initEntityDraw()
        this.drawActivate('Polygon')
        this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
          result.remove();
          this.$prompt('请输入大于0的数字', '淹没深度', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            inputErrorMessage: '数字格式不正确'
          }).then(({value}) => {
            this.flood(positions, value)
            this.isEditing = false
          }).catch(() => {
            viewer.entities.remove(viewer.entities.getById('floodEntity'))
            this.activeMenuList[2].active = false
            this.isEditing = false
          })
        })
        this.entityDraw.CancelEvent.addEventListener(() => {
          viewer.entities.remove(viewer.entities.getById('floodEntity'))
          this.isEditing = false
        })
      }
    },
    //淹没分析
    flood(positions, value) {
      var currentHeight = 1
      var maxHeight = value
      var times = 2
      var speed = (maxHeight - currentHeight) / times;
      let entity = window.viewer.entities.add({
        id: "floodEntity",
        polygon: {
          //hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(adapCoordi),
          hierarchy: positions,
          closeTop: true,
          closeBottom: true,
          fill: true,
          //获取或设置分类类型属性，指定此多边形在地面上时是否对地形、3D瓷砖或两者进行分类。
          classificationType: Cesium.ClassificationType.BOTH,
          material: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString("#007FFF"), 0.4),
          perPositionHeight: true,
          //一个属性，其值由回调函数延迟评估。time, result
          extrudedHeight: 0,
        },
      });
      //设置高度随时间变化
      var setFlood = setInterval(() => {
        if (currentHeight < maxHeight) {
          currentHeight += speed / 30;
          entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function (time, result) {
            return currentHeight;
          }, false);
          if (currentHeight > maxHeight) {
            currentHeight = maxHeight;
            clearInterval(setFlood);
          }
        }
      }, 1000 / 30)
    },
    createPolygon(points) {
      //primitive方式创建.可以制作出水波纹效果。adapCoordi
      let waterPrimitive = new Cesium.Primitive({
        allowPicking: false,
        asynchronous: false,
        geometryInstances: new Cesium.GeometryInstance({
          id: 'floodGeoInstance',
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(points),
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            extrudedHeight: 1,
            height: 0,
          }),
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
          //当为 true 时，几何体应位于椭圆体的表面上,不是在其上方的恒定高度
          aboveGround: true,
          material: new Cesium.Material({
            fabric: {
              type: 'Water',
              uniforms: {
                // blendColor: new Cesium.Color(0, 0, 1, 0.3),
                normalMap: Cesium.buildModuleUrl('static/img/flood.png'),
                //频率速度设置
                frequency: 10000,
                animationSpeed: 0.01,
                amplitude: 1.0,
              }
            },
          })
        })
      });
      this.tileset1 = window.viewer.scene.primitives.add(waterPrimitive);
      // waterPrimitive.update();
      // var sui = waterPrimitive.getGeometryInstanceAttributes('floodGeoInstance');
    },

    initMeasure() {
      let fun = () => {
        this.isEditing = false
      }
      this.mdTool = new MeasureTools(window.viewer, 'distance', fun)
      this.maTool = new MeasureTools(window.viewer, 'area', fun)
      this.mhTool = new MeasureTools(window.viewer, 'height', fun)
    },

    measureDistance() {
      this.isEditing = true
      this.mdTool.initMeasureTools()
    },
    measureArea() {
      this.isEditing = true
      this.maTool.initMeasureTools()
    },
    measureHeight() {
      this.isEditing = true
      this.mhTool.initMeasureTools()
    },
    measureClear() {
      this.mdTool.clear()
      this.maTool.clear()
      this.mhTool.clear()
    },

    // 父组件自发调用
    spontaneousCall(options) {
      this[options.fun]()
    },

    // 添加标记
    initMarkerTool() {
      this.militaryPlotLayer = new xt3d.LabelPlotting.MilitaryPlot.PlotLayer(window.viewer);
      this.militaryPlotLayer.setPlotSelectable(true);
      this.plotDraw = new xt3d.LabelPlotting.MilitaryPlot.PlotDraw(window.viewer);
      this.plotDraw.PlotDrawEndEvent.addEventListener((drawPlot, plotType) => {
        drawPlot.remove();
        this.isEditing = false
        this.militaryPlotLayer.addPlot(drawPlot.toGeoJson());
      });
    },
    addMarkerPoint() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Point')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记点', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Point', value)
          this.markersArr.push(result) // 存一下方便删除
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        });
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerLine() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Polyline')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记线段', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Polyline', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        });
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerPolygon() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Polygon')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记面', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Polygon', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          // result.remove() 不起作用
          window.viewer.entities.remove(result)
          this.isEditing = false
        });
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerCircular() {
      this.isEditing = true
      // this.plotDraw.activate('circle')
      this.initEntityDraw()
      this.drawActivate('Circle')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记圆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Circle', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          // result.remove() 不起作用
          window.viewer.entities.remove(result)
          this.isEditing = false
        });
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    addMarkerRectangle() {
      this.isEditing = true
      this.initEntityDraw()
      this.drawActivate('Rectangle')
      this.entityDraw.DrawEndEvent.addEventListener((result, positions) => {
        this.$prompt('请输入标记名称', '标记矩形', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          addLabelText(result, 'Rectangle', value)
          this.markersArr.push(result)
          this.isEditing = false
        }).catch(() => {
          window.viewer.entities.remove(result)
          this.isEditing = false
        });
      })
      this.entityDraw.CancelEvent.addEventListener(() => {
        this.isEditing = false
      })
    },
    clearMarkers() {
      this.markersArr.forEach(item => {
        window.viewer.entities.remove(item)
        let et = window.viewer.entities.getById('Polygon_Label')
        window.viewer.entities.remove(et)
      })
      this.militaryPlotLayer.clear();
    },

    // 图层效果
    startRain() {
      if (this.weatherEffect1) {
        this.weatherEffect1.removeEffect()
        this.weatherEffect1 = null
      } else {
        this.weatherEffect1 = new xt3d.SceneDominate.WeatherEffect(window.viewer);
        this.weatherEffect1.addRainEffect();
      }
    },
    startSnow() {
      if (this.weatherEffect2) {
        this.weatherEffect2.removeEffect()
        this.weatherEffect2 = null
      } else {
        this.weatherEffect2 = new xt3d.SceneDominate.WeatherEffect(window.viewer);
        this.weatherEffect2.addSnowEffect();
      }
    },
    startFog() {
      if (this.weatherEffect3) {
        this.weatherEffect3.removeEffect()
        this.weatherEffect3 = null
      } else {
        this.weatherEffect3 = new xt3d.SceneDominate.WeatherEffect(window.viewer);
        this.weatherEffect3.addFogEffect();
      }
    },

    startNightVision() {
      if (this.nightVisionEffect) {
        this.nightVisionEffect.enabled = false
        this.nightVisionEffect = null
      } else {
        this.nightVisionEffect = new xt3d.SceneDominate.NightVisionEffect(window.viewer);
        this.nightVisionEffect.enabled = true
      }
    },
    startB_W() {
      if (this.BlackAndWhiteEffect) {
        this.BlackAndWhiteEffect.remove()
        this.BlackAndWhiteEffect = null
      } else {
        this.BlackAndWhiteEffect = new xt3d.SceneDominate.BlackAndWhiteEffect(window.viewer)
        this.BlackAndWhiteEffect.enabled = true
      }
    },

    //初始化绘制
    initEntityDraw() {
      this.entityDraw = new EntityDraw(window.viewer);
    },
    //激活绘制
    drawActivate(type) {
      this.entityDraw.activate(type);
      // this.terrainExcavate.clear();
    },
    initDthFd() {
      // 按栋进行单体化
      this.fdDTH = new Fd(window.viewer, {
        fdDataServerBaseUrl: "http://120.27.230.6:8080/geoserver/py/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=py%3Axssq&maxFeatures=5000&outputFormat=application%2Fjson"
      });

      this.fdDTH.BuildingSelectedEvent.addEventListener((properties, position, type, fid, isDelete = false) => {
        // TODO 分栋完成后的操作
      })
      this.fdDTH.activate();
    },
    initDthFc() {
      let fcDTH = new Fc(window.viewer, {
        fcDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afc_offset&maxFeatures=5000&outputFormat=application%2Fjson"
      });
      fcDTH.FloorSelectedEvent.addEventListener((feature) => {
        if (feature) {
          this.properties = feature.properties
        } else {
          this.properties = null
        }
      })

      fcDTH.activate();
    },
    initDthFh() {
      let fhDTH = new Fh(window.viewer, {
        fcDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afc_offset&maxFeatures=50&outputFormat=application%2Fjson",
        //geoserver数据服务的地址 分户数据地址 分层数据中的楼栋编号和分户数据中的楼编号一致
        fhDataServerBaseUrl: "http://42.192.134.169:8090/geoserver/xt3d/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=xt3d%3Afh_offset&maxFeatures=50&outputFormat=application%2Fjson"
      });
      fhDTH.HouseSelectedEvent.addEventListener((feature) => {
        if (feature) {
          this.properties = feature.properties
        } else {
          this.properties = null
        }
      })

      fhDTH.activate();
    },
    addVideo() {
      let position = Cesium.Cartesian3.fromDegrees(120.3008555978398, 30.406375251999187, 10);
      let et = window.viewer.entities.add({
        position: position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW
        }
      })
      window.viewer.zoomTo(et)
      const videoElement = document.getElementById("myVideo")

      // 参考 https://www.freesion.com/article/83151307019/
      // 时钟同步
      let synchronizer = new Cesium.VideoSynchronizer({
        clock: viewer.clock,
        element: videoElement
      });
      window.viewer.clock.shouldAnimate = true
      videoElement.style.display = 'none'
      this.videoPlane = new xt3d.VideoPlugin.VideoPlane(window.viewer, position, {
        videoElement: videoElement,
        rotation: {
          heading: 90,
          pitch: 80,
          roll: 0
        },
        near: 0,
        far: 30, //距离
        fov: 29, //张角
        aspectRatio: 1,
        stRotation: 301,
        debugFrustum: true //是否显示投影线
      })
    },
    closeVideo() {
      this.videoPlane.remove()
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");

      //由调用者提供需要加载的方法
      this.$on('spontaneousCall', (e) => {
        this.spontaneousCall(e)
      });
    })
    this.initMap()
    this.initRightClick()
    this.initLeftClick()
    this.initMeasure() // 测量工具
    this.initMarkerTool()
  },
  beforeDestroy() {
    window.viewer.entities.removeAll();
    window.viewer.imageryLayers.removeAll(true);
    window.viewer.destroy();
  }
});

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_cesium_rightclick_menuvue_type_script_lang_js_ = (cesium_rightclick_menuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-74.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-74.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-74.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-74.use[3]!./node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js??clonedRuleSet-74.use[4]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue?vue&type=style&index=0&id=4e672d48&prod&scoped=true&lang=less&
var cesium_rightclick_menuvue_type_style_index_0_id_4e672d48_prod_scoped_true_lang_less_ = __webpack_require__(962);
;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue?vue&type=style&index=0&id=4e672d48&prod&scoped=true&lang=less&

;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/src/cesium-rightclick-menu.vue



;


/* normalize component */

var cesium_rightclick_menu_component = normalizeComponent(
  src_cesium_rightclick_menuvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4e672d48",
  null
  
)

/* harmony default export */ var cesium_rightclick_menu = (cesium_rightclick_menu_component.exports);
;// CONCATENATED MODULE: ./cesium-rightclick-menu/cesium-rightclick-menu/index.js


// 为组件提供 install 安装方法，供按需引入
cesium_rightclick_menu.install = Vue => {
    Vue.component(cesium_rightclick_menu.name, cesium_rightclick_menu)
}

// 默认导出组件
/* harmony default export */ var cesium_rightclick_menu_cesium_rightclick_menu = (cesium_rightclick_menu);


;// CONCATENATED MODULE: ./cesium-rightclick-menu/index.js

const components = [
    cesium_rightclick_menu_cesium_rightclick_menu
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = Vue => {
    // 判断是否可以安装
    if (install.installed) return
    // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
/* harmony default export */ var cesium_rightclick_menu_0 = ({
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    cMap: cesium_rightclick_menu_cesium_rightclick_menu
});


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (cesium_rightclick_menu_0);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=landscape-components.umd.js.map