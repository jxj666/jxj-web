/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:32
 */
// 自己包装的订阅与监听模式
var Event = (function() {
  var list = {};
  var listen, trigger, remove;
  listen = function(key, fn) {
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  };
  trigger = function() {
    var key = Array.prototype.shift.call(arguments);
    var fns = list[key];
    if (!fns || fns.lenth == 0) {
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };
  remove = function(key, fn) {
    var fns = list[key];
    console.log(fns);
    if (!fns || fns.length == 0) {
      console.log(`未发现绑定的监听`);
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
      console.log(`清空 key 的所有监听`);
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
          console.log(`成功去除一个监听`);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  };
})();

// // 使用示例

// var fun1 = function(key) {
//     console.log(key)
// }
// Event.listen("fn1", fun1)
// Event.trigger("fn1", 123)
// Event.remove("fn1")
// Event.remove("fn1", fun1)
