/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-07 10:55:33
 */

// 准备module对象
var module = {
  id: "hello",
  exports: {},
};
var load = function(module) {
  function greet(name) {
    console.log(`hello ${name}`);
  }
  module.exports = greet;
  return module.exports;
};
var exported = load(module);
// 保存module
save(module, exported);
