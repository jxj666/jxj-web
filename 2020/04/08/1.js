/*
 * @LastEditTime: 2020-04-08 23:16:32
 * @LastEditors: jinxiaojian
 */

// 难度：简单

// 题目：

// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
let arr = [
  2134,
  234,
  342,
  3214,
  234,
  342,
  3424,
  23,
  2344,
  23,
  2134,
  324,
  43,
  564,
  7,
  214,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  765,
  234,
  12,
  342,
  234,
  214,
  2341,
  456,
  87,
  789,
  87,
  8,
  78,
  456,
  2345,
  123235,
  23,
  456,
  689,
  23523,
  325345,
];
let tag = 3424 + 78;

let twoSum = function(nums, target) {
  console.time();
  for (let i = 0; i < nums.length; i++) {
    let dif = target - nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == dif) {
        console.timeEnd();

        return [i, j];
      }
    }
  }
  return new Error("target不符合!");
};
twoSum(arr, tag);

let twoSum2 = function(nums, target) {
  console.time();
  for (let i = 0; i < nums.length - 1; i++) {
    let dif = target - nums[i];
    let index = nums.indexOf(dif, i + 1);
    if (index > 0) {
      console.timeEnd();
      return [i, index];
    }
  }
  return new Error("target不符合!");
};
twoSum2(arr, tag);
