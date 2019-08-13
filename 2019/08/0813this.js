/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-13 16:05:28
 * @LastEditTime: 2019-08-13 20:49:07
 * @LastEditors: 靳肖健
 */
// this

// function Foo () {
//   this.a = 'a'
//   console.log(this)
// }
// var foo1 = new Foo()


// function foo (a, b) {
//   this.a = a
//   this.b = b
// }

// function Foo (a, b, c) {
//   foo.call(this, a, b)
//   this.c = c
// }

// var foo1 = new Foo(1, 2, 3)

// var foo1 = {
//   a: 11,
//   b: 12,
//   output (c) {
//     console.log(`${c}=>${this.a}`)
//   }
// }
// foo1.output('foo1')
// var foo2 = {
//   a: 21,
//   b: 22
// }
// var foo2output = foo1.output.bind(foo2, 'foo2')
// foo2output()

// // ES6
// Function.prototype.bind = Function.prototype.bind || function (...arg) {
//   const self = this
//   const obj = arg.shift()
//   return function (...arg2) {
//     return self.apply(obj, [...arg, ...arg2])
//   }
// }

// //jiantou
// var a = 'a'
// var obj = {
//   a: 'aa',
//   out: () => {
//     console.log(this.a)
//   }
// }
// obj.out()


// var a = 1

// var obj = {
//   a: 2,
//   out: () => {
//     console.log(this.a)
//     function out () {
//       this.a = 3
//       console.log(this.a)
//     }
//     out.prototype.a = 4
//     return out
//   }
// }

// var out = obj.out()
// out()
// new out()


