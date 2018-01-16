(function loop() {
    console.log('应用继续')
    setTimeout(function() {
        loop()
    }, 1000)
})()
let syncError = function() {
    throw new Error('sync error')
}
let asyncError = function() {
    throw new Error('async error')
}
try {
    syncError()
} catch (e) {
    console.log('同步错误')
}
console.log('同步错误被捕获,应用继续')
let fs = require('fs')
process.on('uncaughtException', (err) => {
    fs.writeSync(1, `异步错误:${err}\n`)
})
setTimeout(() => {
    asyncError()
}, 100)
console.log('异步错误被捕获,应用继续')