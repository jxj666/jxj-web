/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:29:15
 */
//promise
//then的链式

getJSON("/post/1.json")
  .then(post => getJSON(post.commentURL))
  .then(
    comments => console.log("resolved:", comments),
    err => console.log("rejected:", err),
  );
