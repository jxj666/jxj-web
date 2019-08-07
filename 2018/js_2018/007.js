/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:26
 */
//promise
const p1 = new Promise(function(resolve, reject) {});
const p2 = new Promise(function(resolve, reject) {
  resolve(p1);
});
