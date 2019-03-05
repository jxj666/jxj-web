/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:54
 */
// 快速打乱一个数组(存在规律瑕疵)
var arr = [1, 2, 3, 4, 5];
arr.sort(function() {
  return Math.random() - 0.5;
});
