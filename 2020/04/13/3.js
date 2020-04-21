/*
 * @LastEditTime: 2020-04-14 11:06:09
 * @LastEditors: jinxiaojian
 */
//切分,最大=>最小=>最大法
var lengthOfLongestSubstring = function(s) {
  let arr = [...new Set(s.split(""))];
  let arr2 = [];
  arr.forEach(x => {
    arr2.push(
      s.split(x).sort((a, b) => {
        return b.length - a.length;
      })[0],
    );
  });
  return (
    arr2.sort((a, b) => {
      return a.length - b.length;
    })[0].length + 1
  );
};
lengthOfLongestSubstring("abcabcbb");
lengthOfLongestSubstring("bbbbb");
lengthOfLongestSubstring("pwwkew");
