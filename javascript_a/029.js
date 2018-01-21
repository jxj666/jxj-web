//node 错误捕获

(function run() {
    console.log('应用在运行')
    setTimeout(() => run(), 1000)
})()
let syncError = () => {
    throw new Error('sync error')
}
let asyncError = () => {
    setTimeout(() => {
        throw new Error('async error')
    }, 2000)
}
try {
    syncError()
} catch (err) {
    console.log(err)
}
asyncError()
process.on('uncaughtException', (err) => {
    console.log(err)
})