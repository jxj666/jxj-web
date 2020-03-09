/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2020-03-09 11:46:42
 * @LastEditTime: 2020-03-09 13:37:10
 * @LastEditors: 靳肖健
 */

//1
function jump (n) {
  if (n <= 0) {
    return 0
  }
  else if (n == 1 || n == 2) {
    return n
  }
  else {
    return jump(n - 1) + jump(n - 2);
  }
}
jump(9)
jump(999) //卡主

//2
function jump2 (n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  }
  let num1 = 1,
    num2 = 2,
    sum = num2;
  for (let i = 2; i < n; i++) {
    //每新增一阶,两个老的阶段相加
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return sum;
}
jump2(9)
jump2(999)
jump2(99999) //Infinity