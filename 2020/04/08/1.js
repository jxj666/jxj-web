/*
 * @LastEditTime: 2020-04-08 00:19:39
 * @LastEditors: jinxiaojian
 */

// 难度：简单

// 题目：

// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// let twoSum = (nums, target) => {
//   let targetMap = new Map()
//   for (let i = 0; i < nums.length; i++) {
//     const key = target - nums[i]
//     if (targetMap.has(key)) {
//       return [targetMap.get(key), i]
//     }
//     targetMap.set(nums[i], i)
//   }
// }
// twoSum([5, 2, 11, 15, 7, 6], 9)

let twoSum = function(nums, target) {
  for(let i=0;i<nums.length;i++){
      let dif =target-nums[i]
      for(let j=i+1;j<nums.length;j++){
          if(nums[j]==dif){
              return [i,j]
          }
      }
  }
  return new Error('未找到!')
  };
