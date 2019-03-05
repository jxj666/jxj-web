/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:19
 */
// extends
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
  }
}

var dog1 = new Dog("tugo");
dog1.speak();
