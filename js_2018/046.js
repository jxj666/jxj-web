/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:23
 */
//this 指向

//1
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return this;
};

Animal.eat = function() {
  return this;
};

let obj = new Animal("tiger");
let speak = obj.speak;
speak();

let eat = Animal.eat;
eat();

//2
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak();
let speak = obj.speak;
speak();

Animal.eat();
let eat = Animal.eat;
eat();
