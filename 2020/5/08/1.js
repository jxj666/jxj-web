/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!s || !p) {
    return false;
  }
  let sArr = s.split("");
  for (let i = 0; i < p.length; i++) {
    console.log(sArr, p[i]);
    if (p[i] === ".") {
      if (sArr.length) {
        sArr.shift();
      } else {
        if (p[i + 1] === undefined) {
          return true;
        } else if (p[i + 1] === "*" && p[i + 2] === undefined) {
          return true;
        } else {
          return false;
        }
      }
    } else if (p[i] === "*") {
      i -= 2;
    } else {
      if (p[i] === sArr[0]) {
        sArr.shift();
      } else {
        if (p[i + 1] === "*") {
          if (p[i + 2] === undefined) {
            break;
          } else {
            i += 1;
          }
        } else {
          return false;
        }
      }
    }
  }
  return sArr.length === 0 ? true : false;
};
isMatch("aa", ".*");
