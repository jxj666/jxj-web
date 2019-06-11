/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-10 19:09:40
 * @LastEditTime: 2019-06-11 16:27:35
 * @LastEditors: 靳肖健
 */
const Koa = require('koa')
const fs = require('fs')
const path = require('path');
const Router = require('koa-router')
const serve = require('koa-static');
// var bodyParser = require('koa-bodyparser')
const bodyParser = require('koa-body');

const app = new Koa()
const myRouter = new Router()
var i = 0
myRouter
  .all(
    '/',
    async (ctx, next) => {
      ctx.response.type = 'html'
      ctx.response.body = fs.createReadStream('./index.html')
    }
  )
  .get(
    '/get',
    async (ctx, next) => {
      ctx.response.type = 'text'
      ctx.response.body = ("Hello World!")
    }
  )
  .post(
    '/post',
    async (ctx, next) => {
      const body = ctx.request
      var res_obj = {
        content: body,
        success: i++
      }
      ctx.response.type = 'text'
      ctx.response.body = JSON.stringify(res_obj)
    }
  )

app
  .use(serve(path.join(__dirname)))
  .use(bodyParser())
  .use(
    async (ctx, next) => {
      const start = Date.now()
      await next()
      const ms = Date.now() - start
      ctx.set('X-Response-Time', `${ms}ms`)
    }
  )
  .use(
    async (ctx, next) => {
      console.log(`方式 : ${ctx.request.method} 路径 : ${ctx.request.url}`);
      await next();
    }
  )
  .use(
    async (ctx, next) => {
      if (ctx.path == '/' || ctx.path == '/get' || ctx.path == '/post') {
        await next()
      } else {
        ctx.response.status = 404;
        ctx.response.type = 'html'
        ctx.response.body = fs.createReadStream('./error.html')
      }
    }
  )
  .use(myRouter.routes())

  .listen(3001)