/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-13 21:02:02
 * @LastEditTime: 2019-08-13 21:10:40
 * @LastEditors: 靳肖健
 */
// function memory (fun) {
//   var cache = {}
//   return function () {
//     var args = Array.prototype.slice.call(arguments)
//     console.log(args)
//     var key = JSON.stringify(args)
//     console.log(key)
//     return cache[key] || (cache[key] = fun.apply(fun, args))
//   }
// }
// function add (a) {
//   return a + 1
// }

// var adder = memory(add)
// adder(1)
// adder(1)
// adder(2)