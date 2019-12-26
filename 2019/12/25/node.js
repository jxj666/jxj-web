/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-12-25 13:11:57
 * @LastEditTime : 2019-12-26 13:19:16
 * @LastEditors  : 靳肖健
 */
var liveServer = require("live-server");

var params = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./", // Set root directory that's being served. Defaults to cwd.
};
liveServer.start(params);