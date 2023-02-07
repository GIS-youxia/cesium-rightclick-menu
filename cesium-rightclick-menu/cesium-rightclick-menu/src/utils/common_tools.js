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

export {
  dataURLtoBlob,
  disPlayPositionCtrl
}
