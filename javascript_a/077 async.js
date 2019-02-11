app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new DataCue() - start
  ctx.set('X-pesonse-Time', `${ms}ms`)
})