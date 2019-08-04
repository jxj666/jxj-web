/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-05 00:32:03
 * @LastEditTime: 2019-08-05 00:38:46
 * @LastEditors: 靳肖健
 */
var logger = require('tracer').console();
process.on('uncaughtException', function (err) {
  console.error('Error caught in uncaughtException event:', err);
  console.log(1)
  logger.log(err);
  console.log(2)
  process.exit(1);
  console.log(3)

});

try {
  setTimeout(function () {
    throw new Error("error");
  }, 1);
} catch (err) {
  //can not catch it
  console.log(err);
}