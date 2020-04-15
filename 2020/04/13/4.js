/*
 * @LastEditTime: 2020-04-14 10:52:16
 * @LastEditors: jinxiaojian
 */
//子字符串移动法
var lengthOfLongestSubstring = function(s) {
  let longSub = "";
  let nowSub = "";
  for (let i = 0; i < s.length; i++) {
    if (!nowSub.includes(s[i])) {
      nowSub += s[i];
      if (nowSub.length > (longSub.length || 0)) {
        longSub = nowSub;
      }
    } else {
      nowSub += s[i];
      let index = nowSub.indexOf(s[i]);
      nowSub = nowSub.slice(index + 1);
    }
  }
  return longSub.length;
};
lengthOfLongestSubstring("abcabcbb");
lengthOfLongestSubstring("bbbbb");
lengthOfLongestSubstring("pwwkew");
