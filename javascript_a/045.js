/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:25
 */
//构造函数
function A(x, y) {
  this.x = x;
  this.y = y;
}
A.prototype.toString = function() {
  return "(" + this.x + "," + this.y + ")";
};
var a = new A(1, 2);

//class

class B {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}
var b = new B(1, 2);
