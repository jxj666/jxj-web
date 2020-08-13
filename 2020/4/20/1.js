/*
 * @LastEditTime: 2020-04-20 23:42:01
 * @LastEditors: jinxiaojian
 */

let longestPalindrome = function(s) {
  let start = 0;
  let end = 0;
  let n = s.length;
  //对折长度函数
  function half(left, right) {
    while (left >= 0 && right < n && s[left] == s[right]) {
      left -= 1;
      right += 1;
    }
    return right - left - 1;
  }
  for (let i = 0; i < n; i++) {
    //求以当前为中心对折/以周围两元素为中心对折的最大值
    let maxL = Math.max(half(i, i), half(i, i + 1));
    if (maxL > end - start) {
      // 根据对折点计算起始/结束点
      if (maxL % 2 === 0) {
        start = i - (maxL / 2 - 1);
        end = i + maxL / 2;
      } else {
        start = i - (maxL - 1) / 2;
        end = i + (maxL - 1) / 2;
      }
    }
  }
  return s.substring(start, end + 1);
};
longestPalindrome("1211211234");
longestPalindrome("xbbby");
