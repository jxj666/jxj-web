// /*
//  * @LastEditTime: 2020-12-13 20:59:42
//  * @LastEditors: jinxiaojian
//  */
// function sendFile_0(realPath, Request, Response, callback) {
//   try {
//       var stats = fs.statSync(realPath);
//       if (stats.isDirectory()) {
//           callback("error: isDirectory");
//           return;
//       }
//       Response.statusCode = 200;
//       Response.setHeader("Content-Length", stats.size);
//       fs.createReadStream(realPath).pipe(Response);
//   } catch (err) {
//       callback(err);
//   }
// }

// var http = require("http");
// var fs = require("fs");
// http.createServer((Request, Response) => {
//   sendFile_0("index.html", Request, Response, console.log);
// }).listen(7777);
var liveServer = require("live-server");
 
var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);