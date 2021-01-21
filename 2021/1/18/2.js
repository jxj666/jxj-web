/*
 * @LastEditTime: 2021-01-19 20:49:25
 * @LastEditors: jinxiaojian
 */
var lengthOfLastWord = function (s) {
  let sum = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === " " && sum) {
      return sum
    } else if (s[i] !== " ") {
      sum += 1
    }
  }
  return sum
};