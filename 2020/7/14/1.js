/*
 * @Author: your name
 * @Date: 2020-07-13 22:45:32
 * @LastEditTime: 2020-07-13 23:19:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxj-web\2020\07\14\1.js
 */

var searchRange = function (nums, target) {
  //分割点,左边,右边
  let mid, midL, midR;
  function searchR(left, right) {
    while (left <= right) {
      //求中分点
      mid = Math.floor((left + right) / 2);
      if (nums[mid] <= target) left = mid + 1;
      else right = mid - 1;
    }
    return right;
  }
  function searchL(left, right) {
    while (left < right) {
      mid = Math.floor((left + right) / 2)
      if (nums[mid] == target) right = mid;
      else left = mid+1
    }
    return left;
  }
  //右边界
  midR = searchR(0, nums.length - 1);
  if (midR < 0 || nums[midR] !== target) return [-1, -1];
  //左边界
  midL = searchL(0, midR);
  return [midL, midR];
};
