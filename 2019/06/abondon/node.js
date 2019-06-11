/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-10 17:35:09
 * @LastEditTime: 2019-06-10 19:58:06
 * @LastEditors: 靳肖健
 */
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
let word = `
<h1>Hello!</h1>
<img src='http://jxjweb.top/fenhuan.jpg' width='100px'>
`
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(word)
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})