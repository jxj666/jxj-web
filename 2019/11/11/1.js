/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-11-11 20:54:43
 * @LastEditTime: 2019-11-11 20:54:56
 * @LastEditors: 靳肖健
 */
// 01-复杂度1 最大子列和问题 (20 分)

function main (number, arr) {
  var max = 0;
  var sum = 0;
  for (var i = 0; i < number; i++) {
    sum += arr[i];
    // 和大于最大值,最大值赋值;和小于0,抛弃重置
    if (sum > max) {
      max = sum;
    } else if (sum < 0) {
      sum = 0;
    }
  }
  console.log(max);
}