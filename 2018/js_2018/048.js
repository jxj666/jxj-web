/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:16
 */
class A {
  constructor(x) {
    this.name = x;
  }
  static self() {
    return this;
  }
  info() {
    console.log(this);
  }
}
class B extends A {
  info() {
    super.info();
    console.log(this);
  }
}
let b = new B();
b.info();
A.self();
