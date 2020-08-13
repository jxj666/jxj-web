/*
 * @Author: your name
 * @Date: 2020-07-08 21:57:31
 * @LastEditTime: 2020-07-08 22:24:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxj-web\2020\07\08\1.js
 */

// 题干的意思是：找出这个数组排序出的所有数中，刚好比当前数大的那个数
// 比如当前 nums = [1,2,3,2,1]。这个数是123，找出刚刚大的 也就是[1,3,1,2,2]
// 如果当前 nums = [3,2,1] 反转成 [1,2,3]
const nextPermutation = (nums) => {
  // 指针法([1,2,3,2,1])
  let i = nums.length - 2;
  let j = nums.length - 1;
  let k = nums.length - 1;
  //找出降序截止点j,与交换点i
  while (i >= 0 && nums[i] >= nums[j]) {
    i--;
    j--;
  }
  //不存在截止点j,是倒序,就将数组翻转
  if (j === 0) return nums.reverse();

  //如果存在,找交换点k
  while (nums[k] <= nums[i]) {
    k--;
  }
  //数组元素交换 ([1,3,2,2,1])
  [nums[i], nums[k]] = [nums[k], nums[i]];

  //处理降序截止点j后的问题将其变为升序([1,3,1,2,2])
  for (let l = nums.length - 1; j < l; ++j, --l) {
    [nums[j], nums[l]] = [nums[l], nums[j]];
  }

  return nums;
};
