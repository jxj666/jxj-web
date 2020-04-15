/*
 * @LastEditTime: 2020-04-13 22:27:20
 * @LastEditors: jinxiaojian
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let newArr = [...nums1, ...nums2].sort((a, b) => {
    return a - b;
  });
  let num = Math.floor(newArr.length / 2);
  if (newArr.length % 2 === 0) {
    return (newArr[num] + newArr[num - 1]) / 2;
  } else {
    return newArr[num];
  }
};
findMedianSortedArrays([1, 22, 333], [123, 213, 321]);
findMedianSortedArrays([1, 22, 333, 444], [123, 213, 321]);
