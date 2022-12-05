export default class styleInit {
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
