/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:32
 */
//promise

const promise = new Promise(function(resolve, reject) {
  if (ajax) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {}, function(error) {});

//promise 实例

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done");
  });
}
timeout(5000).then(value => {
  console.log(value);
});

//promise 实例

let promise = new Promise(function(resolve, reject) {
  console.log("promise");
  resolve();
});
promise.then(function() {
  console.log("resolve");
});
console.log("hi");
