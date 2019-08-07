/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:23
 */
//promise
const p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

p2.then(result => console.log("then:" + result)).catch(error =>
  console.log("catch:" + error),
);
