var convert = function (s, numRows) {
  //切好数组
  let key = true;
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    let j = key ? i + numRows : i + numRows - 2;
    arr.push(s.substring(i, j));
    i = j - 1;
    key = !key;
  }
  console.log(arr);
  //拼数字
  let text = "";
  for (let i = 0; i < numRows; i++) {
    arr.map((x, j) => {
      text += j % 2 === 0 ? x[i] || "" : x[numRows - 1 - i - 1] || "";
    });
  }
  console.log(text);
};
