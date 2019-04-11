/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳肖健
 * @Date: 2019-04-01 11:19:50
 * @LastEditTime: 2019-04-11 14:53:30
 */
// 1、有一个长度未知的数组a，如果它的长度为0就把数字1添加到数组里面，否则按照先进先出的队列规则让第一个元素出队。
a.length == 0 ? a[0] == 1 : a.shift();
// 2.下面代码会输出什么：
var test = (function(a) {
  this.a = a;
  return function(b) {
    return this.a + b;
  };
})(
  (function(a, b) {
    return a;
  })(1, 2),
);

console.log(test(4));
// 3.请把<ul><li>第1行</li><li>第2行</li>...</ul>（ul之间有10个li元素）插入body里面，注意：需要考虑到性能问题。
var lis = "";
var ul = document.createElement("ul");
for (var i = 1; i <= 10; i++) {
  lis += `<li>第${i}行</li>`;
}
ul.innerHTML = lis;
document.body.appendChild(ul);
