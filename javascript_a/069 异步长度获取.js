/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:35:17
 */
var html = [];
for (var i = 0; i < 100000; i++) {
  html.push("<span>" + i + "</span>");
}
$("#example").html(html.join(" "));
setTimeout(function() {
  var width = $("#example").text().length;
  console.log(width);
}, 0);
