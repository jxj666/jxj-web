/*
 * @LastEditTime: 2021-01-19 20:30:29
 * @LastEditors: jinxiaojian
 */
var maxSubArray = function (nums) {
  let max = nums[0]
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (sum > max) { max = sum }
    if (sum < 0) { sum = 0 }
  }
  return max
};