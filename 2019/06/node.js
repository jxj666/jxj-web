/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-10 17:35:09
 * @LastEditTime: 2019-06-11 10:22:02
 * @LastEditors: 靳肖健
 */
const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.url == '/') {
    fs.readFile('index.html', function readData (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  } else if (req.url == '/get') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write("Hello World!")
    res.end()
  } else if (req.url == '/post') {
    let content = {}
    req.on('data', function (chunk) {
      var arr = chunk.toString().split('&')
      for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split("=")
        content[arr1[0]] = arr1[1]
      }
    })
    req.on('end', function () {
      res.writeHead(200, { "Content-Type": "text/plain" })
      var res_obj = {
        content: content,
        success: 1
      }
      res.write(JSON.stringify(res_obj))
      res.end()
    })
  } else {
    fs.readFile('error.html', function readData (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  }

})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})