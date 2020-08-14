/*
 * @LastEditTime: 2020-04-10 23:32:57
 * @LastEditors: jinxiaojian
 */
var addTwoNumbers = function(l1, l2) {
  //对数组进行补位
  var diff = l1.length - l2.length;
  if (diff > 0) {
    while (diff !== 0) {
      l2.unshift(0);
      diff -= 1;
    }
  } else if (diff < 0) {
    while (diff !== 0) {
      l1.unshift(0);
      diff += 1;
    }
  }
  //生成新数组
  var newl = [];
  var key = 0;
  for (var i = l1.length - 1; i >= 0; i--) {
    var sum = l1[i] + l2[i] + key;
    key = 0;
    if (sum >= 10) {
      key = 1;
      sum -= 10;
    }
    newl.unshift(sum);
  }
  if (key) {
    newl.unshift(key);
  }
  return newl;
};
addTwoNumbers([4, 4, 3], [5, 6, 4]);
addTwoNumbers([4, 4, 3], [5, 6, 4, 5, 5]);
addTwoNumbers([2, 4, 3], [5, 6, 4]);
