/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-08-04 23:58:21
 * @LastEditTime: 2019-08-05 00:16:13
 * @LastEditors: 靳肖健
 */

// // 无法捕获
// try {
//   process.nextTick(function () {
//     throw new Error("error1");
//   });
// } catch (err) {
//   //can not catch it
//   console.log(err);
// }
// //无法捕获
// try {
//   setTimeout(function () {
//     throw new Error("error2");
//   }, 1)
// } catch (err) {
//   //can not catch it
//   console.log(err);
// }

// function async (cb, err) {
//   setTimeout(function () {
//     try {
//       if (true)
//         throw new Error("woops!");
//       else
//         cb("done");
//     } catch (e) {
//       err(e);
//     }
//   }, 2000)
// }

// async(function (res) {
//   console.log("received:", res);
// }, function (err) {
//   console.log("Error: async threw an exception:", err);
//   console.log('running');
// });

// // 回调
// var fs = require('fs')
// fs.readFile('/foo.txt', function (err, data) {
//   console.log(1)
//   if (err !== null) throw err;
//   console.log(data);
// });

function async2 (continuation) {
  setTimeout(function () {
    try {
      var res = 42;
      if (true)
        throw new Error("woops!");
      else
        continuation(null, res); // pass 'null' for error
    } catch (e) {
      continuation(e, null);
    }
  }, 2000);
}

async2(function (err, res) {
  if (err) {
    console.log("Error: (cps) failed:", err);
    console.log(1);
  }
  else {
    console.log("(cps) received:", res);
  }
});
// Error: (cps) failed: woops!