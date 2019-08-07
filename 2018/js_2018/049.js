/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:08
 */
// 原型
function A(name) {
  this.name = name || "A";
  this.info = function() {
    console.log(this.name);
  };
}
A.prototype.v = function(v) {
  console.log(v);
};

//原型链
function B() {}
B.prototype = new A();
B.prototype.name = "B";
var b = new B();
//构造器继承
function B(name) {
  A.call(this);
  this.name = name || "B";
}
var b = new B();
//组合继承
function B(name) {
  A.call(this);
  this.name = name || "B";
}
B.prototype = new a();
B.prototype.constructor = B;
var b = new B();
