/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-09-03 19:52:08
 * @LastEditTime: 2019-09-03 19:54:35
 * @LastEditors: 靳肖健
 */
var obj = {
  a: 1,
  b: {
    c: 2
  }
}
function deepCopy (obj, new_obj_child) {
  var new_obj = new_obj_child || {};
  for (var i in obj) {
    if (typeof obj[i] == 'object') {
      new_obj[i] = {}
      copy(obj[i], new_obj[i])
    } else {
      new_obj[i] = obj[i]
    }
  }
  return new_obj
}
function broadCopy (obj, new_obj_child) {
  var new_obj = new_obj_child || {};
  for (var i in obj) {
    if (typeof obj[i] == 'object') {
      new_obj[i] = {}
    } else {
      new_obj[i] = obj[i]
    }
  }
  for (var i in obj) {
    if (typeof obj[i] == 'object') {
      broadCopy(obj[i], new_obj[i])
    }
  }
  return new_obj
}