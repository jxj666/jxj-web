/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-11-25 20:19:38
 * @LastEditTime: 2019-11-25 20:30:51
 * @LastEditors: 靳肖健
 */
function _new (fun, ...arg) {
  // var obj = {}
  // obj.__prototype__ = fun.prototype
  // 1.以构造器的prototype属性为原型，创建新对象；
  var obj = Object.create(fun.prototype)
  // 2.将this和调用参数传给构造器执行
  var funReturn = fun.apply(obj, arg)
  // return Object.prototype.toString.call(obj) === '[object Object]' ? obj : {}
  // 3.如果构造器没有手动返回对象，则返回第一步的对象
  return funReturn instanceof Object ? funReturn : obj;
}