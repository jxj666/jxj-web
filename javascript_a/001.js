/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:53
 */
//es6

const pi = 3.14;

let target = {
  foo: "hello world",
};
let proxy = new Proxy(target, {
  get(receiver, name) {
    return name in receiver ? receiver[name] : `Hello,${name}`;
  },
});
proxy.foo;
proxy.world;

function f(x, y = 7, z = 7) {
  return x + y + z;
}
f(1);

function f(x, y, ...a) {
  return x + y + a.length;
}
f(1, 2, 3, 4, 5);

odds = evens.map(v => v + 1);

obj = { x, y };

class shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y - y;
  }
}
class Rectangle extends shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
}
