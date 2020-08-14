/*
 * @Author: your name
 * @Date: 2020-06-12 22:28:57
 * @LastEditTime: 2020-06-12 22:40:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxj-web\2020\06\12\1.js
 */ 
var generateParenthesis = function (n) {
    let res = [];
    const choice = (cur, left, right) => {
      if (cur.length === 2 * n) {
        res.push(cur);
        return;
      }
      if (left < n) {
        choice(cur + "(", left + 1, right)
      }
      if (right < left) {
        choice(cur + ")", left, right + 1);
      }
    };
    choice("", 0, 0);
    return res;
  };
