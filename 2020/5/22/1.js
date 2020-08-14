var romanToInt = function (str) {
  let arr = [
    "CM",
    "M",
    "CD",
    "D",
    "XC",
    "C",
    "XL",
    "L",
    "IX",
    "X",
    "IV",
    "V",
    "I",
  ];
  let arr1 = [900, 1000, 400, 500, 90, 100, 40, 50, 9, 10, 4, 5, 1];
  let num = 0;
  arr.map((x, i) => {
    str = str.replace(RegExp(x, "g"), () => {
      num += arr1[i];
      return "";
    });
  });
  return num;
};
