/*
 * @LastEditTime: 2020-07-23 13:20:41
 * @LastEditors: jinxiaojian
 */
function add (...args) {
  let fun = function (...args1) { return add.apply(null, [...args, ...args1]) }
  fun.toString = function () {
    console.log(1)
    return args.reduce((a, b) => a + b)
  }
  return fun
}