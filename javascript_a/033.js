/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:51
 */
//设备信息
function device_type() {
  var ua = navigator.userAgent;
  var agent = ["Android", "iPhone"];
  for (var i = 0; i < agent.length; i++) {
    if (ua.indexOf(agent[i]) > 0) {
      return `符合运行条件!`;
    }
  }
  return `不符合运行条件1`;
}
device_type();
