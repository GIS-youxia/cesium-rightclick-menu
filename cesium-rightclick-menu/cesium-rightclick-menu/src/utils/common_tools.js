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

export {
  dataURLtoBlob,
  disPlayPositionCtrl,
  getRanNum,
  getFloat,
  toPoint,
  compare
}
