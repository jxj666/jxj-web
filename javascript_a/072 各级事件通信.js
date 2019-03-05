/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:34:30
 */
var bus = new vue();
bus.$emit("id-selected", {});
bus.$on("id-selected", function(obj) {});
