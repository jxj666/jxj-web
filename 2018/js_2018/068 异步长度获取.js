/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:35:22
 */
var width;
// Firefox和Chrome早期版本中带有前缀
var MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;
// 选择目标节点
var target = document.getElementById("example");
// 创建观察者对象
var observer1 = new MutationObserver(function(mutations) {
  setTimeout(function() {
    width = $("#example").text().length;
    console.log(width);
  }, 0);
});
// 配置观察选项:
var config = { subtree: true, childList: true, attributes: true };
// 传入目标节点和观察选项
observer1.observe(target, config);

var div = document.getElementById("example");
var html = [];
for (var i = 0; i < 100000; i++) {
  html.push("<span>" + i + "</span>");
}
$("#example").html(html.join(" "));
