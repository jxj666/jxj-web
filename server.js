function sendFile_0(realPath, Request, Response, callback) {
  try {
      var stats = fs.statSync(realPath);
      if (stats.isDirectory()) {
          callback("error: isDirectory");
          return;
      }
      Response.statusCode = 200;
      Response.setHeader("Content-Length", stats.size);
      fs.createReadStream(realPath).pipe(Response);
  } catch (err) {
      callback(err);
  }
}

var http = require("http");
var fs = require("fs");
http.createServer((Request, Response) => {
  sendFile_0("/index.html", Request, Response, console.log);
}).listen(7777);