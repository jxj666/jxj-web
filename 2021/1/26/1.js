/*
 * @LastEditTime: 2021-01-26 20:30:56
 * @LastEditors: jinxiaojian
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let total = []

  function getNew (arr1, arr2) {
    if (arr2.length === 1) {
      total.push([...arr1, ...arr2])
    } else {
      arr2.forEach(x => {
        getNew([...arr1, x], arr2.filter(y => y !== x))
      });
    }
  }
  getNew([], nums)
  return total
};

let test1=[1,2,3]
permute(test1)

// https://leetcode-cn.com/problems/permutations/