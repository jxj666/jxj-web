/*
 * @LastEditTime: 2020-06-01 14:17:15
 * @LastEditors: jinxiaojian
 */

var threeSumClosest = function (nums, target) {
  //排序计算
  let newArr = nums.sort((a, b) => a - b);
  let ans = newArr[0] + newArr[1] + newArr[2];
  //定义 三个数取法 循环
  for (let i = 0; i < newArr.length; i++) {
    let start = i + 1;
    let end = newArr.length - 1;
    // console.log(newArr);
    while (start < end) {
      let sum = newArr[i] + newArr[start] + newArr[end];
      //找出最近似的数
      if (Math.abs(target - sum) < Math.abs(target - ans)) {
        ans = sum;
      }
      // console.log(i, start, end, ans, sum);
      if (sum > target) {
        end--;
      } else if (sum < target) {
        start++;
      } else {
        return ans;
      }
    }
    // console.log(ans);
  }
  return ans;
};
// threeSumClosest([-1, 2, 1, -4], 1);
// threeSumClosest([1, 1, 1, 0], 100);
// threeSumClosest([1, 2, 4, 8, 16, 32, 64, 128], 82);
threeSumClosest([-3, -2, -5, 3, -4], -1);
