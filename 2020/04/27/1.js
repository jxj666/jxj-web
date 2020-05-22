let reverse = function (x) {
  let ord = Math.abs(x);
  let now = 0;
  //取余进行倒转累加
  while (ord > 0) {
    now = now * 10 + (ord % 10);
    ord = Math.floor(ord / 10);
  }
  //判断输入正负及范围
  return x < 0
    ? now <= Math.pow(2, 31)
      ? -now
      : 0
    : now < Math.pow(2, 31)
    ? now
    : 0;
};
