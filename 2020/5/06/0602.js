// 不转换字符,数位计算
var isPalindrome = function (x) {
  // log计算
  function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
  if (x < 0) {
    return false;
  } else {
    let k = Math.floor(getBaseLog(10, x));
    for (let i = 0; i < k - i; i++) {
      if (
        Math.floor(x / Math.pow(10, i)) % 10 !==
        Math.floor(x / Math.pow(10, k - i)) % 10
      ) {
        return false;
      }
    }
    return true;
  }
};
