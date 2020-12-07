/*
 * @LastEditTime: 2020-09-10 00:09:12
 * @LastEditors: jinxiaojian
 */
function getStr (int) {
  if (int >= 10) {
    return int % 10 + getStr(Math.floor(int / 10))
  } else {
    return int + ''
  }
}