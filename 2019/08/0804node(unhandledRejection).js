/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-05 00:42:53
 * @LastEditTime: 2019-08-05 00:49:43
 * @LastEditors: 靳肖健
 */
var process = require('process')

// process.on('unhandledRejection', function (err, p) {
//   console.log(1)
//   console.error(err.stack);
//   console.log(2)
// })
// var promise = new Promise(function (resolve, reject) {
//   reject(new Error("Broken."));
// });
// promise.then(function (result) {
//   console.log(result);
// })

var http = require('http');

http.createServer(function (req, res) {
  var promise = new Promise(function (resolve, reject) {
    reject(new Error("Broken."))
  })
  promise.info = { url: req.url }
}).listen(8080)

process.on('unhandledRejection', function (err, p) {
  console.log(1)
  if (p.info && p.info.url) {
    console.log('Error in URL', p.info.url)
  }
  console.log(2)
  console.error(err.stack)
  console.log(3)
})