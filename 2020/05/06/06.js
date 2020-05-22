//字符串判断方法
var myAtoi = function (str) {
  let loop = 0;
  let now;
  while (loop < str.length) {
    if (!now) {
      if (str[loop] === " ") {
        loop++;
        continue;
      } else if (str[loop] === "-" || str[loop] === "+" || str[loop] >= 0) {
        now = str[loop];
      } else {
        return 0;
      }
    } else if (str[loop] >= 0) {
      now += str[loop];
      if (now < Math.pow(-2, 31)) return Math.pow(-2, 31);
      if (now > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
    } else {
      break;
    }
    loop++;
  }
  return parseInt(now) || 0;
};
