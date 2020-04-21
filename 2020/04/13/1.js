/*
 * @LastEditTime: 2020-04-13 22:12:16
 * @LastEditors: jinxiaojian
 */

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
  if (nums1.length > nums2.length) {
    let temp = nums1;
    nums1 = nums2;
    nums2 = temp;
  }

  let len1 = nums1.length,
    len2 = nums2.length;
  // 两个数组取中间，因为存在奇数，所以nums1 默认floor， nums2 默认 ceil，以保证 左右两侧的数量差不大于1
  let i = Math.floor(len1 / 2),
    j = Math.ceil(len2 / 2);
  let beforeI = 0;

  while (true) {
    // A[L] < B[R] B[L] < A[R] 此时数量相等，满足左侧均小于右侧
    // 存在边界情况，即 两数组不相交，此时A[L]、A[R]、B[L]、B[R]可能不存在(即为undefined)，此时不做比较，直接取中间数
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
      // 左侧数量 === 右侧数量，取 左侧最大值 和 右侧最小值 平分
      if (leftLen === rightLen) {
        return (max(nums1[i - 1], nums2[j - 1]) + min(nums2[j], nums1[i])) / 2;
      }
      // 左侧数量 > 右侧数量，中位数为左侧最大值
      if (leftLen - 1 === rightLen) return max(nums1[i - 1], nums2[j - 1]);
      // 左侧数量 < 右侧数量，中位数为右侧最小值
      if (leftLen + 1 === rightLen) return min(nums2[j], nums1[i]);
    } else if (nums1[i - 1] > nums2[j]) {
      // A[L] > B[R], i 左移半 j 右移同样
      let step = Math.max(Math.floor((i - beforeI) / 2), 1);
      beforeI = i;
      i -= step;
      j += step;
      continue;
    } else if (nums2[j - 1] > nums1[i]) {
      // B[L] > A[R], i 右移半 j 左移同样
      let step = Math.max(Math.floor((i - beforeI) / 2), 1);
      beforeI = i;
      i += step;
      j -= step;
      continue;
    }
  }
};
