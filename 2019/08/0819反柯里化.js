// function unCurrying(fn) {
//     return function (tar, ...argu) {
//         return fn.apply(tar, argu)
//     }
// }
// var push = unCurrying(Array.prototype.push)

// function execPush() {
//     push(arguments, 4)
//     console.log(arguments)
// }

// execPush(1, 2, 3)    // 输出: [1, 2, 3, 4]

var isType = function(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
  }
  
  var isString = isType('String')
  var isFunction = isType('Function')