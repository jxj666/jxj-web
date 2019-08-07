/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:46
 */
//复制事件

document.addEventListener("copy", function() {
  var a = window.getSelection().baseNode.data;
  window.clipboardData.setData("text", a);
  console.log(window.clipboardData);
});
