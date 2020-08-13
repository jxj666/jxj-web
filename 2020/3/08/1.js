var data = { 1: 222, 2: 123, 5: 888 };
function arrData(obj) {
  var arr = new Array(12);

  // arr.forEach(x => {
  //   x = null;
  // });
  for (x in obj) {
    arr[x - 1] = obj[x];
  }
  return arr;
}
arrData(data);
