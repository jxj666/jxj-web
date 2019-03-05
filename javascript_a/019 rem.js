/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:27:03
 */
// rem 根 size 计算
function get_size(ratio) {
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / ratio + "px";
}
function delay(method, context, ratio) {
  clearTimeout(method.time);
  method.time = setTimeout(function() {
    method.call(context, ratio);
  });
}
window.onresize = function() {
  delay(get_size, undefined, ratio);
};
