/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:27:31
 */
// 快速排序

//quick swap part

function quick(arr) {
  var left_arr = [];
  var right_arr = [];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      left_arr.push(arr[i]);
    } else {
      right_arr.push(arr[i]);
    }
  }
  if (left_arr.length > 1) {
    left_arr = quick(left_arr);
  }
  if (right_arr.length > 1) {
    right_arr = quick(right_arr);
  }
  arr1 = left_arr.concat(arr[0], right_arr);
  console.log(arr1);
  return arr1;
}

var arr = [1, 11, 3, 33, 2, 22];
quick(arr);
