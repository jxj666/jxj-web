/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-05 00:26:59
 * @LastEditTime: 2019-08-05 00:29:42
 * @LastEditors: 靳肖健
 */
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();


emitter.on('error', function (err) {
  console.error('出错：' + err.message);
  console.log(1)
});
emitter.emit('error', new Error('something bad happened'));