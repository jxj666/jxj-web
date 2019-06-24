/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:35
 */
//CMD
define(function(require, exports, module) {
  var a = require("./a");
  a.fun();
  var b = require("./b");
  b.fun();
});

//AMD
define(["./a", "./b"], function(a, b) {
  a.fun();
  b.fun();
});

//CommonJS
//a.js
exports.fun1 = function() {};
//b.js
var fun1 = require("a").fun1;
exports.fun2 = function() {
  fun1();
};
//c.js
var fun2 = require("b").fun2;
fun2();
