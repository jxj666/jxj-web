/*
 * @LastEditTime: 2020-04-20 15:22:09
 * @LastEditors: jinxiaojian
 */
<<<<<<< HEAD

function min(a, b) {
  return Math.min(
    a === undefined ? Infinity : a,
    b === undefined ? Infinity : b,
  );
}
function max(a, b) {
  return Math.max(
    a === undefined ? -Infinity : a,
    b === undefined ? -Infinity : b,
  );
}

var findMedianSortedArrays = function (nums1, nums2) {
  // 短的数组作为nums1，可以减少二分的次数
=======

var findMedianSortedArrays = function(nums1, nums2) {
  function min(a, b) {
    return Math.min(
      a === undefined ? Infinity : a,
      b === undefined ? Infinity : b,
    );
  }
  function max(a, b) {
    return Math.max(
      a === undefined ? -Infinity : a,
      b === undefined ? -Infinity : b,
    );
  }
>>>>>>> 5586b6fd1d21e786e5da122cf17c2f0598f941d7
  if (nums1.length > nums2.length) {
    let temp = nums1;
    nums1 = nums2;
    nums2 = temp;
  }
  let len1 = nums1.length,
    len2 = nums2.length;
  let i = Math.floor(len1 / 2),
    j = Math.ceil(len2 / 2);
  let beforeI = 0;
  while (true) {
    if (
      (nums1[i - 1] === undefined ||
        nums2[j] === undefined ||
        nums1[i - 1] <= nums2[j]) &&
      (nums2[j - 1] === undefined ||
        nums1[i] === undefined ||
        nums2[j - 1] <= nums1[i])
    ) {
      let leftLen = i + j,
        rightLen = len1 + len2 - i - j;
      if (leftLen === rightLen) {
        return (max(nums1[i - 1], nums2[j - 1]) + min(nums2[j], nums1[i])) / 2;
      }
      if (leftLen - 1 === rightLen) return max(nums1[i - 1], nums2[j - 1]);
      if (leftLen + 1 === rightLen) return min(nums2[j], nums1[i]);
    } else if (nums1[i - 1] > nums2[j]) {
      let step = Math.max(Math.floor((i - beforeI) / 2), 1);
      beforeI = i;
      i -= step;
      j += step;
      continue;
    } else if (nums2[j - 1] > nums1[i]) {
      let step = Math.max(Math.floor((i - beforeI) / 2), 1);
      beforeI = i;
      i += step;
      j -= step;
      continue;
    }
  }
};
findMedianSortedArrays([1, 22, 333], [123, 213, 321]);
findMedianSortedArrays([1, 22, 333, 444], [123, 213, 321]);
