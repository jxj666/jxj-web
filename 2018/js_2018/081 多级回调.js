/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:30:19
 */
getData(a => {
  getMoreData(a, b => {
    getMoreData(b, c => {
      console.log(c);
    });
  });
});

getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => console.log(c))(async () => {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  console.log(c);
});
